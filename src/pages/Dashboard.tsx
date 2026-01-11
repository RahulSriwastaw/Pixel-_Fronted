import { useOrders } from "@/hooks/use-orders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { Package, Download, Clock, Star, User, Settings, Shield } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="bg-card border-b border-border mb-8">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-display font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and downloads</p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 border border-border">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="w-4 h-4" /> My Orders
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <Star className="w-4 h-4" /> My Reviews
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" /> Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Package className="w-5 h-5 text-primary" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors gap-4">
                        <div className="flex items-start gap-4">
                           <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                            <img src={order.design.image} className="w-full h-full object-cover" alt="" />
                           </div>
                           <div>
                             <h3 className="font-bold">{order.design.title}</h3>
                             <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                               <span>Order #{order.id}</span>
                               <span>•</span>
                               <span>{order.createdAt ? format(new Date(order.createdAt), 'PPP') : 'Just now'}</span>
                             </div>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                            {order.status}
                          </Badge>
                          
                          {order.status === 'completed' ? (
                            <Button size="sm" variant="outline" className="gap-2">
                              <Download className="w-4 h-4" /> Download
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" disabled className="gap-2 opacity-50">
                              <Clock className="w-4 h-4" /> In Progress
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-bold text-lg">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">Start exploring amazing designs to boost your content.</p>
                    <Link href="/explore">
                      <Button>Explore Designs</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Star className="w-5 h-5 text-primary" />
                  Your Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                   <p>You haven't left any reviews yet.</p>
                   <p className="text-sm">Reviews help other users find the best designers!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue="Alex Chen" />
                      </div>
                      <div className="space-y-2">
                        <Label>Display Name</Label>
                        <Input defaultValue="alex_design" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input defaultValue="alex@test.com" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Input placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Shield className="w-4 h-4" /> Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="w-4 h-4" /> Two-Factor Auth
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
