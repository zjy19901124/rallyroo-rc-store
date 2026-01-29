import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useAddresses, type Address, type AddressInput } from "@/hooks/useAddresses";
import { useOrders } from "@/hooks/useOrders";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, MapPin, Package, LogOut, Plus, Pencil, Trash2, Star, Loader2 } from "lucide-react";
import { format } from "date-fns";

const AUSTRALIAN_STATES = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "SA", label: "South Australia" },
  { value: "WA", label: "Western Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "NT", label: "Northern Territory" },
  { value: "ACT", label: "Australian Capital Territory" },
];

export default function Account() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile } = useProfile();
  const { addresses, isLoading: addressesLoading, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses();
  const { orders, isLoading: ordersLoading } = useOrders();

  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ full_name: "", phone: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressForm, setAddressForm] = useState<AddressInput>({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    suburb: "",
    state: "",
    postcode: "",
    is_default: false,
  });
  const [savingAddress, setSavingAddress] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleEditProfile = () => {
    setProfileForm({
      full_name: profile?.full_name || "",
      phone: profile?.phone || "",
    });
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    const { error } = await updateProfile(profileForm);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated");
      setEditingProfile(false);
    }
    setSavingProfile(false);
  };

  const handleOpenAddressDialog = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        name: address.name,
        phone: address.phone || "",
        address_line1: address.address_line1,
        address_line2: address.address_line2 || "",
        suburb: address.suburb,
        state: address.state,
        postcode: address.postcode,
        is_default: address.is_default,
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        name: "",
        phone: "",
        address_line1: "",
        address_line2: "",
        suburb: "",
        state: "",
        postcode: "",
        is_default: addresses.length === 0,
      });
    }
    setAddressDialogOpen(true);
  };

  const handleSaveAddress = async () => {
    if (!addressForm.name || !addressForm.address_line1 || !addressForm.suburb || !addressForm.state || !addressForm.postcode) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSavingAddress(true);
    let result;
    if (editingAddress) {
      result = await updateAddress(editingAddress.id, addressForm);
    } else {
      result = await addAddress(addressForm);
    }

    if (result.error) {
      toast.error("Failed to save address");
    } else {
      toast.success(editingAddress ? "Address updated" : "Address added");
      setAddressDialogOpen(false);
    }
    setSavingAddress(false);
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    const { error } = await deleteAddress(id);
    if (error) {
      toast.error("Failed to delete address");
    } else {
      toast.success("Address deleted");
    }
  };

  const handleSetDefault = async (id: string) => {
    const { error } = await setDefaultAddress(id);
    if (error) {
      toast.error("Failed to set default address");
    } else {
      toast.success("Default address updated");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-secondary text-secondary-foreground";
      case "refunded":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-accent text-accent-foreground";
    }
  };

  if (profileLoading) {
    return (
      <Layout title="My Account - RallyRoo">
        <div className="section-container py-16 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Account - RallyRoo">
      <div className="section-container py-8 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  {!editingProfile && (
                    <Button variant="outline" size="sm" onClick={handleEditProfile}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingProfile ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} disabled={savingProfile}>
                        {savingProfile ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setEditingProfile(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{profile?.full_name || "Not set"}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{profile?.email || user?.email}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{profile?.phone || "Not set"}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">Member Since</p>
                      <p className="font-medium">
                        {profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "—"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your shipping addresses</CardDescription>
                  </div>
                  <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => handleOpenAddressDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Address
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={addressForm.name}
                              onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                              placeholder="Recipient name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="addr_phone">Phone</Label>
                            <Input
                              id="addr_phone"
                              value={addressForm.phone || ""}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                              placeholder="Phone number"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address_line1">Address Line 1 *</Label>
                          <Input
                            id="address_line1"
                            value={addressForm.address_line1}
                            onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                            placeholder="Street address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address_line2">Address Line 2</Label>
                          <Input
                            id="address_line2"
                            value={addressForm.address_line2 || ""}
                            onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                            placeholder="Apartment, unit, etc."
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="suburb">Suburb *</Label>
                            <Input
                              id="suburb"
                              value={addressForm.suburb}
                              onChange={(e) => setAddressForm({ ...addressForm, suburb: e.target.value })}
                              placeholder="Suburb"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State *</Label>
                            <Select
                              value={addressForm.state}
                              onValueChange={(value) => setAddressForm({ ...addressForm, state: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {AUSTRALIAN_STATES.map((state) => (
                                  <SelectItem key={state.value} value={state.value}>
                                    {state.value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postcode">Postcode *</Label>
                            <Input
                              id="postcode"
                              value={addressForm.postcode}
                              onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                              placeholder="0000"
                              maxLength={4}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="is_default"
                            checked={addressForm.is_default}
                            onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="is_default" className="font-normal">
                            Set as default address
                          </Label>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button onClick={handleSaveAddress} disabled={savingAddress} className="flex-1">
                            {savingAddress ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {editingAddress ? "Update Address" : "Add Address"}
                          </Button>
                          <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {addressesLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No addresses saved yet</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => handleOpenAddressDialog()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="relative rounded-lg border p-4 hover:border-primary/50 transition-colors"
                      >
                        {address.is_default && (
                          <Badge className="absolute right-2 top-2 bg-secondary">
                            <Star className="mr-1 h-3 w-3" />
                            Default
                          </Badge>
                        )}
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.address_line1}
                          {address.address_line2 && <>, {address.address_line2}</>}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.suburb}, {address.state} {address.postcode}
                        </p>
                        {address.phone && (
                          <p className="text-sm text-muted-foreground">{address.phone}</p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenAddressDialog(address)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {!address.is_default && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefault(address.id)}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your past orders</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No orders yet</p>
                    <Button asChild variant="outline" className="mt-4">
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link
                        key={order.id}
                        to={`/account/orders/${order.id}`}
                        className="block rounded-lg border p-4 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(order.created_at), "d MMM yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <p className="text-lg font-bold mt-1">
                              ${(order.amount_total / 100).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
