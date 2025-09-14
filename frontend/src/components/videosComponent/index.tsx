import React, { JSX, useState } from "react";
import { Video, Plus, ExternalLink, X } from "lucide-react";
import { VideoLinkType } from "@modules/postProperty/PhotosStep";

interface VideoLinksSectionProps {
  videoLinks: VideoLinkType[];
  onAddVideoLink: (videoLink: VideoLinkType) => void;
  onRemoveVideoLink: (index: number) => void;
}

export const VideoLinksSection: React.FC<VideoLinksSectionProps> = ({
  videoLinks,
  onAddVideoLink,
  onRemoveVideoLink,
}) => {
  const [newVideoLink, setNewVideoLink] = useState<string>("");
  const [newVideoTitle, setNewVideoTitle] = useState<string>("");

  const detectPlatform = (url: string): string => {
    if (!url || typeof url !== "string") return "other";

    const lowerUrl: string = url.toLowerCase().trim();
    if (lowerUrl.includes("youtube.com") || lowerUrl.includes("youtu.be"))
      return "youtube";
    if (lowerUrl.includes("tiktok.com")) return "tiktok";
    if (lowerUrl.includes("facebook.com") || lowerUrl.includes("fb.watch"))
      return "facebook";
    if (lowerUrl.includes("instagram.com")) return "instagram";
    if (lowerUrl.includes("vimeo.com")) return "vimeo";
    if (lowerUrl.includes("twitter.com") || lowerUrl.includes("x.com"))
      return "twitter";
    return "other";
  };

  const isValidUrl = (string: string): boolean => {
    try {
      const url: URL = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  const getPlatformIcon = (platform: string): JSX.Element => {
    const iconClass: string = "w-4 h-4";
    switch (platform) {
      case "youtube":
        return <span className={`${iconClass} text-red-600`}>▶</span>;
      case "tiktok":
        return <span className={`${iconClass} text-black`}>🎵</span>;
      case "facebook":
        return <span className={`${iconClass} text-blue-600`}>f</span>;
      case "instagram":
        return <span className={`${iconClass} text-pink-600`}>📷</span>;
      case "vimeo":
        return <span className={`${iconClass} text-blue-500`}>V</span>;
      case "twitter":
        return <span className={`${iconClass} text-blue-400`}>🐦</span>;
      default:
        return <Video className={iconClass} />;
    }
  };

  const handleAddVideoLink = (): void => {
    if (!newVideoLink.trim()) return;

    if (!isValidUrl(newVideoLink)) {
      alert("Please enter a valid URL");
      return;
    }

    const detectedPlatform = detectPlatform(newVideoLink.trim());

    const newLink: VideoLinkType = {
      url: newVideoLink.trim(),
      title: newVideoTitle.trim() || "",
      platform: detectedPlatform || "other", // Fallback to "other" if undefined
    };

    onAddVideoLink(newLink);
    setNewVideoLink("");
    setNewVideoTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && newVideoLink.trim()) {
      e.preventDefault();
      handleAddVideoLink();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Video className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-800">Video Links</h3>
        <span className="text-sm text-gray-500">(optional)</span>
      </div>

      {/* Add Video Link Form */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <input
              type="url"
              placeholder="Paste video URL (YouTube, TikTok, Facebook, etc.)"
              value={newVideoLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewVideoLink(e.target.value)
              }
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Title (optional)"
              value={newVideoTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewVideoTitle(e.target.value)
              }
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddVideoLink}
          disabled={!newVideoLink.trim()}
          className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md transition-colors ${
            newVideoLink.trim()
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Plus className="w-4 h-4" />
          Add Video Link
        </button>
      </div>

      {/* Video Links List */}
      {videoLinks.length > 0 && (
        <div className="space-y-3">
          {videoLinks.map((link: VideoLinkType, index: number) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
            >
              <div className="flex-shrink-0">
                {getPlatformIcon(link.platform)}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {link.title ||
                      `${
                        link.platform && link.platform.length > 0
                          ? link.platform.charAt(0).toUpperCase() +
                            link.platform.slice(1)
                          : "Video"
                      } Video`}
                  </p>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-gray-500 truncate">{link.url}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveVideoLink(index)}
                className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Remove video link"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Video Guidelines */}
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="text-sm font-medium text-blue-700 mb-2">
          Video Guidelines:
        </h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>
            • Supported platforms: YouTube, TikTok, Facebook, Instagram, Vimeo
          </li>
          <li>• Paste the direct link to your video</li>
          <li>• Make sure videos are public and accessible</li>
          <li>
            • Consider adding property tours, neighborhood views, or feature
            highlights
          </li>
        </ul>
      </div>
    </div>
  );
};
