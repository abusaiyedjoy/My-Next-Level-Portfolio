// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Send, CheckCircle2, Zap, AlertCircle } from 'lucide-react';

// const ContactFormWithEmail = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');

//   // EmailJS Configuration
//   // Replace these with your actual EmailJS credentials
//   const EMAILJS_SERVICE_ID = 'service_yuohx56';
//   const EMAILJS_TEMPLATE_ID = 'template_xxhuk1i';
//   const EMAILJS_PUBLIC_KEY = 'gBf8PO4FarSFho18q';

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setError('');

//   try {
//     const response = await fetch('/api/send-email', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     });

//     if (response.ok) {
//       setIsSubmitted(true);
//       setFormData({ name: '', email: '', subject: '', message: '' });
//       setTimeout(() => setIsSubmitted(false), 5000);
//     } else {
//       throw new Error('Failed to send');
//     }
//   } catch (err) {
//     setError('Failed to send message. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };f

//   const sendEmailWithEmailJS = async (data) => {
//     // Load EmailJS script dynamically
//     if (!window.emailjs) {
//       const script = document.createElement('script');
//       script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
//       script.async = true;
//       document.body.appendChild(script);
      
//       await new Promise((resolve) => {
//         script.onload = resolve;
//       });
      
//       window.emailjs.init(EMAILJS_PUBLIC_KEY);
//     }

//     const templateParams = {
//       from_name: data.name,
//       from_email: data.email,
//       subject: data.subject,
//       message: data.message,
//       to_email: 'your-email@example.com', // Your email address
//     };

//     return window.emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       templateParams
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');

//     try {
//       // Using EmailJS
//       await sendEmailWithEmailJS(formData);
      
//       setIsSubmitted(true);
//       setFormData({ name: '', email: '', subject: '', message: '' });
      
//       // Reset success message after 5 seconds
//       setTimeout(() => setIsSubmitted(false), 5000);
//     } catch (err) {
//       console.error('Error sending email:', err);
//       setError('Failed to send message. Please try again or contact me directly via email.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="border-none py-10 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-2xl">
//       <CardHeader>
//         <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
//           <Send className="w-7 h-7 text-[#334CEC]" />
//           Send Me a Message
//         </CardTitle>
//         <p className="text-gray-600 dark:text-gray-400 my-2">
//           Fill out the form below and I'll get back to you as soon as possible.
//         </p>
//       </CardHeader>

//       <CardContent>
//         {isSubmitted ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-12"
//           >
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: 'spring' }}
//               className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
//             >
//               <CheckCircle2 className="w-12 h-12 text-white" />
//             </motion.div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//               Message Sent Successfully!
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400 mb-6">
//               Thank you for reaching out. I'll get back to you within 24 hours.
//             </p>
//             <motion.button
//               onClick={() => setIsSubmitted(false)}
//               className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Send Another Message
//             </motion.button>
//           </motion.div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3"
//               >
//                 <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
//                 <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
//               </motion.div>
//             )}

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-semibold">
//                   Your Name *
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="John Doe"
//                   required
//                   className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-semibold">
//                   Your Email *
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="john@example.com"
//                   required
//                   className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Subject *
//               </Label>
//               <Input
//                 id="subject"
//                 name="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 placeholder="Project Inquiry"
//                 required
//                 className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 font-semibold">
//                 Your Message *
//               </Label>
//               <Textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Tell me about your project..."
//                 required
//                 rows={10}
//                 className="border-none bg-white/50 dark:bg-white/5 backdrop-blur-sm focus:ring-2 focus:ring-[#334CEC]/50 resize-none"
//               />
//             </div>

//             <motion.button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#334CEC] to-purple-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#334CEC]/50 transition-all ${
//                 isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
//               }`}
//               whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
//               whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
//             >
//               {isSubmitting ? (
//                 <>
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//                   >
//                     <Zap className="w-5 h-5" />
//                   </motion.div>
//                   Sending...
//                 </>
//               ) : (
//                 <>
//                   <Send className="w-5 h-5" />
//                   Send Message
//                 </>
//               )}
//             </motion.button>
//           </form>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ContactFormWithEmail;