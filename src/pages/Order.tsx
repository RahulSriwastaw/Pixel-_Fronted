import { useRoute, useLocation } from "wouter";
import { useDesign } from "@/hooks/use-designs";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Lock, Upload, Palette, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function Order() {
  const [, params] = useRoute("/order/:id");
  const [, setLocation] = useLocation();
  const id = Number(params?.id);
  const { data: design, isLoading } = useDesign(id);
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { toast } = useToast();
  
  const [instructions, setInstructions] = useState("");
  const [useOfficialColors, setUseOfficialColors] = useState(false);
  const [preferredColors, setPreferredColors] = useState("");

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!design) return <div className="min-h-screen flex items-center justify-center">Design not found</div>;

  const handleSubmit = () => {
    createOrder({
      designId: design.id,
      userId: 1, 
      instructions,
      useOfficialColors,
      preferredColors: preferredColors.split(",").map(c => c.trim()).filter(c => c),
      status: "pending"
    }, {
      onSuccess: () => {
        setLocation("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-display font-bold mb-8">Complete Your Order</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6">Requirements</h2>
              
              <div className="space-y-8">
                {/* Text Instructions */}
                <div className="space-y-3">
                  <Label htmlFor="instructions" className="text-base font-semibold">Describe what you need</Label>
                  <Textarea 
                    id="instructions"
                    placeholder="E.g., Please use my logo, make the text 'SUMMER SALE' in bold yellow..."
                    className="min-h-[120px] text-base resize-none focus:ring-primary"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                </div>

                {/* File Upload Mocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Upload Logo</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">Click to upload logo</span>
                      <span className="text-xs text-muted-foreground">PNG, SVG (Max 5MB)</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Reference Photos</Label>
                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">Click to upload images</span>
                      <span className="text-xs text-muted-foreground">JPG, PNG (Max 10MB)</span>
                    </div>
                  </div>
                </div>

                {/* Color Preferences */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">Color Preferences</h3>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                    <Checkbox 
                      id="official-colors" 
                      checked={useOfficialColors}
                      onCheckedChange={(checked) => setUseOfficialColors(!!checked)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="official-colors"
                        className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Use Official Brand Colors
                      </label>
                      <p className="text-sm text-muted-foreground">
                        I want the designer to use my brand's exact colors.
                      </p>
                    </div>
                  </div>

                  {!useOfficialColors && (
                    <div className="space-y-2">
                      <Label htmlFor="colors">Specific Colors (Optional)</Label>
                      <Input 
                        id="colors"
                        placeholder="e.g. Royal Blue, Gold, #FF5733"
                        value={preferredColors}
                        onChange={(e) => setPreferredColors(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Separate multiple colors with commas.</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="p-4 bg-muted/50 rounded-lg border border-border border-dashed text-center text-muted-foreground">
                <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Payment integration is mocked for this demo.</p>
                <p className="text-sm">You won't be charged.</p>
              </div>
            </Card>
          </div>

          {/* Sidebar Summary */}
          <div className="md:col-span-1">
            <Card className="p-6 sticky top-24 border-border shadow-md">
              <div className="flex gap-4 mb-4">
                <img 
                  src={design.image} 
                  alt={design.title} 
                  className="w-20 h-20 object-cover rounded-lg bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm line-clamp-2">{design.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{design.category}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${Number(design.price).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>$2.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border mt-2">
                  <span>Total</span>
                  <span className="text-primary">${(Number(design.price) + 2).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  className="w-full text-lg h-12 shadow-lg shadow-primary/20"
                  onClick={handleSubmit}
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Confirm & Pay"}
                </Button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>SSL Secure Payment</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
