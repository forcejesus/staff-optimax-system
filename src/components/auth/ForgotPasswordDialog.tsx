
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordDialog = ({ isOpen, onClose }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() && !phone.trim()) {
      toast.error("Veuillez saisir votre email ou votre numéro de téléphone");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
      
      // We would normally call an API here to send the reset email
      console.log("Password reset requested for:", { email, phone });
    }, 1500);
  };

  const handleClose = () => {
    // Reset form state when closing
    setStep("form");
    setEmail("");
    setPhone("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Récupération de mot de passe</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {step === "form" 
              ? "Veuillez saisir votre email ou numéro de téléphone pour récupérer votre compte." 
              : "Demande envoyée avec succès!"}
          </DialogDescription>
        </DialogHeader>
        
        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Adresse email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@entreprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Numéro de téléphone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                    <span>Vérification...</span>
                  </div>
                ) : (
                  <span>Récupérer</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg">
              <p>Nous avons vérifié vos informations avec succès.</p>
              <p className="mt-2">Si un compte est associé à cet email ou ce numéro, vous recevrez un email avec un mot de passe temporaire.</p>
            </div>
            
            <Button 
              onClick={handleClose} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 mt-4"
            >
              Fermer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
