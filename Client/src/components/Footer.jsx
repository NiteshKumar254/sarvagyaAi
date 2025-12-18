export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[##f9f9f9] to-[#9af1ff] text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="" className="h-11"
                        src="/src/assets/Saarvagya_logo.png" />
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    Create standout content using AI tools. Saarvagya.ai streamlines content creation with intelligent automation—saving time, improving quality, and unlocking creative potential.
                    
                </p>
            </div>
            <div className="border-t border-gray-500">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="https://prebuiltui.com">Saarvagya.ai</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
    );
};