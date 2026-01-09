import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="font-heading text-sm font-medium text-muted-foreground">
            © {currentYear} Tanmay Vaij. All rights reserved.
          </p>

          <p className="text-sm text-muted-foreground font-body">
            Built with passion & precision.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
