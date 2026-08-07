'use client'

import { motion } from "framer-motion";
import { Cog } from "lucide-react";

export default function BlogsAndArticles() {
    return (
        <div className="w-full h-screen overflow-hidden font-body flex flex-col items-center justify-center py-2">
            <h1 className="text-2xl font-bold mb-4 text-center">Blogs & Articles</h1>
            <p className="text-center text-gray-600">Coming soon...</p>
            <motion.div
            animate={{ rotate: 360}}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear'}}
            >
                <Cog className="w-12 h-12" />
            </motion.div>
        </div>
    );
}