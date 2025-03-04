
import { Separator } from "@/components/ui/separator";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-purple-50">
      <div className="max-w-4xl px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-center text-purple-600">
          Please read these terms carefully before using SecureChat
        </p>
        
        <div className="p-6 mt-10 bg-white rounded-lg shadow">
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-xl font-semibold text-purple-800">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SecureChat, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">2. Use License</h2>
            <p>
              Permission is granted to temporarily use SecureChat for personal, non-commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="ml-6 list-disc">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on SecureChat</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">3. Community Guidelines</h2>
            <p>
              All users of SecureChat must adhere to the following guidelines:
            </p>
            <ul className="ml-6 list-disc">
              <li>Respect other users and their privacy</li>
              <li>Do not share illegal content or engage in illegal activities</li>
              <li>Do not post content that is hateful, threatening, pornographic, or that incites violence</li>
              <li>Do not harass, bully, or intimidate other users</li>
              <li>Do not impersonate others or create multiple accounts for deceptive purposes</li>
              <li>Do not spam or distribute unsolicited advertisements</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">4. Privacy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. Our Privacy Policy outlines how we collect, use, and protect your information when you use SecureChat.
            </p>
            <p>
              While we strive to provide anonymous and encrypted communication, please be aware that no method of transmission over the internet is 100% secure. We cannot guarantee the absolute security of your data.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">5. Limitation of Liability</h2>
            <p>
              In no event shall SecureChat or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use SecureChat, even if SecureChat or a SecureChat authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">6. Content Ownership</h2>
            <p>
              Users retain all ownership rights to the content they post on SecureChat. However, by posting content, you grant SecureChat a non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the service.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">7. Termination</h2>
            <p>
              We may terminate or suspend your account and access to SecureChat immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms and Conditions.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">8. Changes to Terms</h2>
            <p>
              SecureChat reserves the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page. Your continued use of the service after such modifications will constitute your acknowledgment of the modified terms and agreement to abide by them.
            </p>
            
            <Separator className="my-6" />
            
            <h2 className="text-xl font-semibold text-purple-800">9. Contact Us</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us through the contact form on our FAQ page.
            </p>
            
            <p className="mt-8 text-sm text-center text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
