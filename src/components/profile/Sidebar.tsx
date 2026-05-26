import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Globe, Phone, ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useArtist } from "@/context/ArtistContext";
import { Modal } from "@/components/ui/modal";

export function Sidebar() {
  const { artist, isEditing, updateArtist } = useArtist();
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactContactForm] = useState(artist.contact);

  const [isListenOnModalOpen, setIsListenOnModalOpen] = useState(false);
  const [tempListenOn, setTempListenOn] = useState(artist.socials.filter(s => ["Spotify", "Apple Music", "YouTube", "SoundCloud"].includes(s.platform)));

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateArtist({ contact: contactForm });
    setIsContactModalOpen(false);
  };

  const handleListenOnSave = () => {
    // Merge tempListenOn back into socials
    const otherSocials = artist.socials.filter(s => !["Spotify", "Apple Music", "YouTube", "SoundCloud"].includes(s.platform));
    updateArtist({ socials: [...otherSocials, ...tempListenOn] });
    setIsListenOnModalOpen(false);
  };

  const updateTempListenUrl = (platform: string, url: string) => {
    setTempListenOn(prev => prev.map(s => s.platform === platform ? { ...s, url } : s));
  };

  const listenPlatforms = artist.socials.filter(s => ["Spotify", "Apple Music", "YouTube", "SoundCloud"].includes(s.platform));

  return (
    <aside className="w-full lg:w-[320px] flex flex-col gap-6 flex-shrink-0">
      
      {/* Promotional Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-[#0B1021] to-songdew-blue text-white overflow-hidden relative border-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
          <h3 className="font-heading font-bold text-2xl mb-2 relative z-10">
            Book {artist.name.split(" ")[0]}
          </h3>
          <p className="text-white/80 font-body text-sm mb-6 relative z-10">
            Available for live concerts, corporate events, and brand collaborations globally.
          </p>
          <Button className="w-full bg-white text-songdew-blue hover:bg-white/90 relative z-10 font-bold">
            Send Enquiry
          </Button>
        </Card>
      </motion.div>

      {/* Listen On Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-songdew-text">
              Listen On
            </h3>
            {isEditing && (
              <button
                onClick={() => {
                  setTempListenOn(artist.socials.filter(s => ["Spotify", "Apple Music", "YouTube", "SoundCloud"].includes(s.platform)));
                  setIsListenOnModalOpen(true);
                }}
                className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-songdew-blue"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {listenPlatforms.map((platform) => (
              <a 
                key={platform.platform} 
                href={platform.url} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-[12px] bg-songdew-bg hover:bg-[#F2F6FA] border border-black/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <MusicIcon platform={platform.platform} />
                </div>
                <span className="text-[13px] font-body font-medium text-songdew-text truncate">{platform.platform}</span>
              </a>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Profile Strength */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="font-heading font-semibold text-lg text-songdew-text mb-4">
            Profile Strength
          </h3>
          <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-songdew-blue w-[65%] rounded-full" />
          </div>
          <p className="text-sm font-body text-songdew-gray mb-4">
            65% Complete — Add your latest release to reach 80%
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { text: "Add bio", done: true },
              { text: "Connect social links", done: true },
              { text: "Upload 3 high-res photos", done: false },
              { text: "Add a recent release", done: false },
            ].map((task, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-body">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${task.done ? "bg-songdew-blue border-songdew-blue text-white" : "border-black/20 text-transparent"}`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={task.done ? "text-songdew-text line-through opacity-60" : "text-songdew-text"}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-lg text-songdew-text">
              Contact
            </h3>
            {isEditing && (
              <button
                onClick={() => {
                  setContactContactForm(artist.contact);
                  setIsContactModalOpen(true);
                }}
                className="p-1.5 hover:bg-black/5 rounded-full transition-colors text-songdew-blue"
                aria-label="Edit Contact Info"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-songdew-text font-body text-[15px]">
              <Mail className="w-5 h-5 text-songdew-gray" />
              <a href={`mailto:${artist.contact.email}`} className="hover:text-songdew-blue transition-colors">
                {artist.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-songdew-text font-body text-[15px]">
              <Phone className="w-5 h-5 text-songdew-gray" />
              <span>{artist.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-songdew-text font-body text-[15px]">
              <Globe className="w-5 h-5 text-songdew-gray" />
              <a href={`https://${artist.contact.website}`} target="_blank" rel="noreferrer" className="hover:text-songdew-blue transition-colors flex items-center gap-1">
                {artist.contact.website} <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Modals */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Edit Contact Info"
      >
        <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-songdew-text">Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactContactForm({...contactForm, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-songdew-text">Phone</label>
              <input
                type="text"
                value={contactForm.phone}
                onChange={(e) => setContactContactForm({...contactForm, phone: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-songdew-text">Website</label>
              <input
                type="text"
                value={contactForm.website}
                onChange={(e) => setContactContactForm({...contactForm, website: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="secondary" onClick={() => setIsContactModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isListenOnModalOpen} 
        onClose={() => setIsListenOnModalOpen(false)} 
        title="Edit Streaming Platforms"
      >
        <div className="flex flex-col gap-4">
          {["Spotify", "Apple Music", "YouTube", "SoundCloud"].map((platform) => (
            <div key={platform} className="flex flex-col gap-2">
              <label className="text-sm font-medium text-songdew-text flex items-center gap-2">
                <MusicIcon platform={platform} /> {platform} URL
              </label>
              <input 
                type="text"
                value={tempListenOn.find(s => s.platform === platform)?.url || ""}
                onChange={(e) => updateTempListenUrl(platform, e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-songdew-blue/20 focus:border-songdew-blue transition-all"
                placeholder={`https://${platform.toLowerCase()}.com/...`}
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsListenOnModalOpen(false)}>Cancel</Button>
            <Button onClick={handleListenOnSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}

function MusicIcon({ platform }: { platform: string }) {
  // Simplistic mapper for platform icons
  return <Globe className="w-4 h-4 text-songdew-blue" />;
}
