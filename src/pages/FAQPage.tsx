
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";

const FAQPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  const faqs = [
    {
      question: "What is SecureChat?",
      answer: "SecureChat is an encrypted anonymous chatroom platform that allows users to communicate securely without revealing their identity. Users can create or join chat rooms anonymously or create an account for additional features."
    },
    {
      question: "Is SecureChat really anonymous?",
      answer: "Yes, if you choose to join as an anonymous user, we do not collect any personal data that could identify you. All messages are encrypted end-to-end, ensuring your privacy."
    },
    {
      question: "What's the difference between anonymous and registered users?",
      answer: "Anonymous users can join and participate in chat rooms without creating an account. Registered users enjoy additional features like direct messaging, media sharing, and the ability to add friends."
    },
    {
      question: "How do I create a private room?",
      answer: "When creating a room, check the 'Private Room' option and set an access code. You can share this code with others to allow them to join your private room."
    },
    {
      question: "Can I recover my account if I forget my password?",
      answer: "Yes, you can reset your password through the 'Forgot Password' option on the login page. You'll receive a password reset link to your registered email address."
    },
    {
      question: "Is my data stored securely?",
      answer: "Yes, all user data is encrypted and stored securely. We follow industry best practices to ensure your information remains private and protected."
    },
    {
      question: "How do you handle inappropriate content or behavior?",
      answer: "We have a community guidelines policy in place. Users can report inappropriate content or behavior, which our moderators will review. Violations may result in warnings or account suspensions."
    },
    {
      question: "Can I delete my messages or account?",
      answer: "Yes, registered users can delete their own messages and account at any time. When you delete your account, all your personal data is permanently removed from our systems."
    }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-center text-purple-600">
          Find answers to common questions about SecureChat
        </p>
        
        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full bg-white rounded-lg shadow">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 text-purple-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="p-6 mt-12 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-purple-800">Contact Us</h2>
          <p className="mt-2 text-purple-600">
            Have a question that's not answered above? Send us a message and we'll get back to you.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Your Message
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
