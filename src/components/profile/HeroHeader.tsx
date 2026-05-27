import { useState } from "react";
import { MapPin, BadgeCheck, Music2, Camera, Pencil } from "lucide-react";
import { useArtist } from "@/context/ArtistContext";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export function HeroHeader() {
  const { artist, isEditing, updateArtist } = useArtist();
  const [isBannerModalOpen, setBannerModalOpen] = useState(false);
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isSocialModalOpen, setSocialModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  
  const [tempBannerUrl, setTempBannerUrl] = useState(artist.bannerUrl);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(artist.avatarUrl);
  const [tempSocials, setTempSocials] = useState(artist.socials);
  const [tempInfo, setTempInfo] = useState({ name: artist.name, type: artist.type, location: artist.location });

  const handleBannerSave = () => {
    updateArtist({ bannerUrl: tempBannerUrl });
    setBannerModalOpen(false);
  };

  const handleAvatarSave = () => {
    updateArtist({ avatarUrl: tempAvatarUrl });
    setAvatarModalOpen(false);
  };

  const handleSocialSave = () => {
    updateArtist({ socials: tempSocials });
    setSocialModalOpen(false);
  };

  const handleInfoSave = () => {
    updateArtist(tempInfo);
    setInfoModalOpen(false);
  };

  const updateTempSocial = (platform: string, url: string) => {
    setTempSocials(prev => prev.map(s => s.platform === platform ? { ...s, url } : s));
  };

  const getSocialUrl = (platform: string) => {
    return artist.socials.find(s => s.platform === platform)?.url || "#";
  };

  const getTempSocialUrl = (platform: string) => {
    return tempSocials.find(s => s.platform === platform)?.url || "";
  };

  return (
    <div className="w-full flex flex-col">
      {/* Banner */}
      <div className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] rounded-[20px] overflow-hidden relative group/banner">
        <img 
          src={artist.bannerUrl} 
          alt="Artist Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {isEditing && (
          <button 
            onClick={() => {
              setTempBannerUrl(artist.bannerUrl);
              setBannerModalOpen(true);
            }}
            className="absolute inset-0 bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors group z-20"
          >
            <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
              <Camera className="w-6 h-6 text-songdew-blue" />
            </div>
          </button>
        )}
      </div>

      {/* Profile Info Area */}
      <div className="px-4 sm:px-8 flex flex-col md:flex-row gap-6 relative">
        {/* Avatar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative -mt-[50px] sm:-mt-[60px] flex-shrink-0"
        >
          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-[24px] overflow-hidden border-[4px] sm:border-[6px] border-songdew-bg bg-white shadow-lg relative z-10 group/avatar">
            <img 
              src={artist.avatarUrl} 
              alt={artist.name}
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <button 
                onClick={() => {
                  setTempAvatarUrl(artist.avatarUrl);
                  setAvatarModalOpen(true);
                }}
                className="absolute inset-0 bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors group z-20"
              >
                <div className="bg-white/90 p-2 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                  <Camera className="w-5 h-5 text-songdew-blue" />
                </div>
              </button>
            )}
          </div>
        </motion.div>

        {/* Text Details */}
        <div className="pt-2 sm:pt-4 flex flex-col md:flex-row justify-between w-full gap-4 md:gap-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col relative group/info"
          >
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-bold text-[clamp(1.75rem,5vw,2.625rem)] leading-tight text-songdew-text tracking-tight">
                {artist.name}
              </h1>
              {artist.verified && (
                <div className="w-6 h-6 md:w-7 md:h-7 bg-songdew-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <BadgeCheck className="w-3.5 h-3.5 md:w-4 h-4 text-white" />
                </div>
              )}
              {isEditing && (
                <button 
                  onClick={() => {
                    setTempInfo({ name: artist.name, type: artist.type, location: artist.location });
                    setInfoModalOpen(true);
                  }}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-songdew-blue opacity-0 group-hover/info:opacity-100"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <p className="font-body text-[18px] text-songdew-text font-medium mt-1">
              {artist.type}
            </p>
            
            <div className="flex items-center gap-2 mt-2 text-songdew-gray">
              <MapPin className="w-4 h-4" />
              <span className="font-body text-[15px]">{artist.location}</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <SocialIcon icon={<InstagramIcon />} href={getSocialUrl("Instagram")} />
            <SocialIcon icon={<YoutubeIcon />} href={getSocialUrl("YouTube")} />
            <SocialIcon icon={<TwitterIcon />} href={getSocialUrl("X")} />
            <SocialIcon icon={<Music2 className="w-5 h-5" />} href={getSocialUrl("Spotify")} />
            
            {isEditing && (
              <button 
                aria-label="Edit Social Links"
                onClick={() => {
                  setTempSocials(artist.socials);
                  setSocialModalOpen(true);
                }}
                className="w-10 h-10 rounded-full bg-songdew-blue/10 border border-songdew-blue/20 flex items-center justify-center text-songdew-blue hover:bg-songdew-blue hover:text-white transition-all ml-1"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Banner Modal */}
      <Modal 
        isOpen={isBannerModalOpen} 
        onClose={() => setBannerModalOpen(false)} 
        title="Edit Banner Image"
      >
        <div className="flex flex-col gap-6">
          <FileUpload 
            label="Upload Banner" 
            accept="image/*" 
            onFileSelect={setTempBannerUrl} 
            previewUrl={tempBannerUrl} 
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-songdew-text">Or enter Banner Image URL</label>
            <input 
              type="text"
              value={tempBannerUrl}
              onChange={(e) => setTempBannerUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setBannerModalOpen(false)}>Cancel</Button>
            <Button onClick={handleBannerSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Avatar Modal */}
      <Modal 
        isOpen={isAvatarModalOpen} 
        onClose={() => setAvatarModalOpen(false)} 
        title="Edit Profile Image"
      >
        <div className="flex flex-col gap-6">
          <FileUpload 
            label="Upload Avatar" 
            accept="image/*" 
            onFileSelect={setTempAvatarUrl} 
            previewUrl={tempAvatarUrl} 
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-songdew-text">Or enter Avatar Image URL</label>
            <input 
              type="text"
              value={tempAvatarUrl}
              onChange={(e) => setTempAvatarUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all text-sm"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setAvatarModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAvatarSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Basic Info Modal */}
      <Modal 
        isOpen={isInfoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
        title="Edit Basic Information"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-songdew-text">Artist Name</label>
            <input 
              type="text"
              value={tempInfo.name}
              onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-songdew-text">Artist Type</label>
            <input 
              type="text"
              value={tempInfo.type}
              onChange={(e) => setTempInfo({ ...tempInfo, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
              placeholder="Singer • Composer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-songdew-text">Location</label>
            <input 
              type="text"
              value={tempInfo.location}
              onChange={(e) => setTempInfo({ ...tempInfo, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
              placeholder="City, Country"
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setInfoModalOpen(false)}>Cancel</Button>
            <Button onClick={handleInfoSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>

      {/* Edit Social Links Modal */}
      <Modal 
        isOpen={isSocialModalOpen} 
        onClose={() => setSocialModalOpen(false)} 
        title="Edit Social Links"
      >
        <div className="flex flex-col gap-4">
          {[
            { platform: "Instagram", label: "Instagram URL", icon: <InstagramIcon /> },
            { platform: "YouTube", label: "YouTube URL", icon: <YoutubeIcon /> },
            { platform: "X", label: "Twitter (X) URL", icon: <TwitterIcon /> },
            { platform: "Spotify", label: "Spotify URL", icon: <Music2 className="w-4 h-4" /> },
          ].map((social) => (
            <div key={social.platform} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-songdew-text flex items-center gap-2">
                {social.icon} {social.label}
              </label>
              <input 
                type="text"
                value={getTempSocialUrl(social.platform)}
                onChange={(e) => updateTempSocial(social.platform, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
                placeholder="https://..."
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setSocialModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSocialSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-songdew-text hover:text-songdew-blue hover:border-songdew-blue hover:shadow-sm transition-all"
    >
      {icon}
    </a>
  );
}
