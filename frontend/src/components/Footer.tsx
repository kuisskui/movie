import config from "@/config";

export default function Footer() {
  return (
    <div className="bg-gray-100 py-4 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
    </div>
  );
}
