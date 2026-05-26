"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { useArtist } from "@/context/ArtistContext";
import { FileUpload } from "@/components/ui/file-upload";
import { 
  Play, Download, Trophy, Disc, Activity, Music, 
  Video, Image as ImageIcon, Pencil, Trash2, Plus, 
  Calendar, ExternalLink, FileText
} from "lucide-react";

interface ContentSectionsProps {
  activeTab: string;
}

export function ContentSections({ activeTab }: ContentSectionsProps) {
  return (
    <div className="w-full mt-8 relative min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {activeTab === "Story" && <StorySection />}
          {activeTab === "Music" && <MusicSection />}
          {activeTab === "Popular Tracks" && <PopularTracksSection />}
          {activeTab === "Video" && <VideoSection />}
          {activeTab === "Photo" && <PhotoSection />}
          {activeTab === "Live Performances" && <PerformancesSection />}
          {activeTab === "Achievements" && <AchievementsSection />}
          {activeTab === "In Press" && <PressSection />}
          {activeTab === "Assets" && <AssetsSection />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StorySection() {
  const { artist, isEditing, updateArtist } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(artist.story.excerpt);

  const handleSave = () => {
    updateArtist({
      story: { ...artist.story, excerpt: tempBio }
    });
    setIsModalOpen(false);
  };

  return (
    <Card className="p-8 relative border-none shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-heading text-2xl font-bold text-songdew-text">About {artist.name}</h3>
        {isEditing && (
          <button
            onClick={() => {
              setTempBio(artist.story.excerpt);
              setIsModalOpen(true);
            }}
            aria-label="Edit Bio"
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-songdew-blue"
          >
            <Pencil className="w-5 h-5" />
          </button>
        )}
      </div>
      <p className="font-body text-[16px] text-songdew-text/80 leading-relaxed max-w-3xl">
        {artist.story.excerpt}
      </p>
      <Button variant="link" className="mt-4 px-0">Read full story</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Artist Bio"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Bio Excerpt</label>
            <textarea
              value={tempBio}
              onChange={(e) => setTempBio(e.target.value)}
              className="w-full h-40 p-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px] resize-none"
              placeholder="Tell your story..."
            />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function MusicSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });

  const handleAdd = () => {
    addSectionItem("releases", newItem);
    setNewItem({ title: "", type: "Single", year: "2024", coverUrl: "", audioUrl: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artist.releases.map((release, i) => (
        <Card key={i} hoverLift className="overflow-hidden flex flex-col group cursor-pointer border-none shadow-sm relative">
          {isEditing && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeSectionItem("releases", i); }}
              className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="aspect-square w-full overflow-hidden relative">
            <img src={release.coverUrl} alt={release.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play className="w-5 h-5 text-songdew-text" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-heading font-semibold text-lg text-songdew-text line-clamp-1">{release.title}</h4>
            <p className="font-body text-sm text-songdew-gray mt-1">{release.type} • {release.year}</p>
          </div>
        </Card>
      ))}
      {isEditing && (
        <EmptyStateCard 
          icon={<Music className="w-6 h-6 text-songdew-gray" />} 
          title="Add Music" 
          cta="Upload Release" 
          onClick={() => setIsModalOpen(true)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Music Release">
        <div className="flex flex-col gap-5">
          <Input label="Release Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Track or Album Name" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-heading font-semibold text-songdew-text">Type</label>
              <select 
                value={newItem.type} 
                onChange={e => setNewItem({...newItem, type: e.target.value})}
                className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
              >
                <option>Single</option>
                <option>EP</option>
                <option>Album</option>
              </select>
            </div>
            <Input label="Year" value={newItem.year} onChange={v => setNewItem({...newItem, year: v})} placeholder="2024" />
          </div>

          <FileUpload 
            label="Upload Cover Art" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, coverUrl: url})} 
            previewUrl={newItem.coverUrl}
          />

          <FileUpload 
            label="Upload Audio File (MP3)" 
            accept="audio/*" 
            onFileSelect={url => setNewItem({...newItem, audioUrl: url})} 
            previewUrl={newItem.audioUrl}
          />

          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Release</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function PopularTracksSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", duration: "", streams: "", coverUrl: "" });

  const handleAdd = () => {
    addSectionItem("popularTracks", newItem);
    setNewItem({ title: "", duration: "", streams: "", coverUrl: "" });
    setIsModalOpen(false);
  };

  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-xl text-songdew-text">Popular Tracks</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Track
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {artist.popularTracks.map((track, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-[12px] hover:bg-black/5 transition-colors group cursor-pointer relative">
            <div className="w-6 text-center font-body text-songdew-gray text-sm">{i + 1}</div>
            <div className="w-12 h-12 rounded-[8px] overflow-hidden relative">
              <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-body font-medium text-songdew-text">{track.title}</h4>
              <p className="font-body text-xs text-songdew-gray mt-0.5">{track.streams} Streams</p>
            </div>
            <div className="font-body text-sm text-songdew-gray mr-2">{track.duration}</div>
            {isEditing && (
              <button 
                onClick={(e) => { e.stopPropagation(); removeSectionItem("popularTracks", i); }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {artist.popularTracks.length === 0 && !isEditing && (
          <div className="py-8 text-center text-songdew-gray font-body">No popular tracks listed.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Popular Track">
        <div className="flex flex-col gap-5">
          <Input label="Track Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Track Name" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration" value={newItem.duration} onChange={v => setNewItem({...newItem, duration: v})} placeholder="3:45" />
            <Input label="Streams" value={newItem.streams} onChange={v => setNewItem({...newItem, streams: v})} placeholder="1.2M" />
          </div>
          <FileUpload 
            label="Upload Cover Image" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, coverUrl: url})} 
            previewUrl={newItem.coverUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Track</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function VideoSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });

  const handleAdd = () => {
    addSectionItem("videos", newItem);
    setNewItem({ title: "", views: "0", duration: "0:00", thumbnailUrl: "", videoUrl: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {artist.videos.map((video, i) => (
        <Card key={i} hoverLift className="overflow-hidden group cursor-pointer border-none shadow-sm relative">
          {isEditing && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeSectionItem("videos", i); }}
              className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <div className="aspect-video w-full overflow-hidden relative">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play className="w-5 h-5 text-songdew-text" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-body px-2 py-1 rounded-[4px] backdrop-blur-md">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-heading font-semibold text-songdew-text line-clamp-2">{video.title}</h4>
            <p className="font-body text-sm text-songdew-gray mt-1">{video.views} Views</p>
          </div>
        </Card>
      ))}
      {isEditing && (
        <EmptyStateCard 
          icon={<Video className="w-6 h-6 text-songdew-gray" />} 
          title="Add Video" 
          cta="Upload Video" 
          onClick={() => setIsModalOpen(true)}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Video">
        <div className="flex flex-col gap-5">
          <Input label="Video Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Official Music Video" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Views" value={newItem.views} onChange={v => setNewItem({...newItem, views: v})} placeholder="1.2M" />
            <Input label="Duration" value={newItem.duration} onChange={v => setNewItem({...newItem, duration: v})} placeholder="4:15" />
          </div>
          <FileUpload 
            label="Upload Thumbnail" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, thumbnailUrl: url})} 
            previewUrl={newItem.thumbnailUrl}
          />
          <FileUpload 
            label="Upload Video File (MP4)" 
            accept="video/*" 
            onFileSelect={url => setNewItem({...newItem, videoUrl: url})} 
            previewUrl={newItem.videoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Video</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function PhotoSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const handleAdd = () => {
    addSectionItem("photos", newUrl);
    setNewUrl("");
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {artist.photos.map((photo, i) => (
        <div key={i} className="aspect-square rounded-[12px] overflow-hidden group cursor-pointer relative shadow-sm">
          <img src={photo} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {isEditing && (
            <button 
              onClick={(e) => { e.stopPropagation(); removeSectionItem("photos", i); }}
              className="absolute top-2 right-2 z-30 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <div 
          onClick={() => setIsModalOpen(true)}
          className="aspect-square rounded-[12px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-black/5 transition-colors"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Photo</span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Photo">
        <div className="flex flex-col gap-5">
          <FileUpload 
            label="Upload Photo" 
            accept="image/*" 
            onFileSelect={setNewUrl} 
            previewUrl={newUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Photo</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function PerformancesSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", venue: "", city: "", date: "Jan 01, 2025" });

  const handleAdd = () => {
    addSectionItem("performances", newItem);
    setNewItem({ name: "", venue: "", city: "", date: "Jan 01, 2025" });
    setIsModalOpen(false);
  };

  return (
    <Card className="p-6 border-none shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading font-bold text-xl text-songdew-text">Live Performances</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Performance
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {artist.performances.map((perf, i) => (
          <div key={i} className="flex items-start gap-4 group relative">
            <div className="w-16 flex-shrink-0 flex flex-col items-center justify-center bg-[#F2F6FA] rounded-[8px] py-2">
              <span className="font-heading text-xs text-songdew-blue font-bold uppercase">{perf.date.split(" ")[0]}</span>
              <span className="font-heading text-xl text-songdew-text font-bold">{perf.date.split(" ")[1]?.replace(",", "")}</span>
            </div>
            <div className="pt-1">
              <h4 className="font-heading font-semibold text-lg text-songdew-text">{perf.name}</h4>
              <p className="font-body text-sm text-songdew-gray mt-1">{perf.venue}, {perf.city}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm" className="hidden sm:flex">Tickets</Button>
              {isEditing && (
                <button 
                  onClick={() => removeSectionItem("performances", i)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {artist.performances.length === 0 && !isEditing && (
          <div className="py-8 text-center text-songdew-gray font-body">No upcoming performances.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Live Performance">
        <div className="flex flex-col gap-4">
          <Input label="Event Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Music Festival Name" />
          <Input label="Venue" value={newItem.venue} onChange={v => setNewItem({...newItem, venue: v})} placeholder="Stadium or Club Name" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="City" value={newItem.city} onChange={v => setNewItem({...newItem, city: v})} placeholder="Mumbai" />
            <Input label="Date" value={newItem.date} onChange={v => setNewItem({...newItem, date: v})} placeholder="Dec 12, 2024" />
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Performance</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function AchievementsSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", organization: "", icon: "trophy" });

  const handleAdd = () => {
    addSectionItem("achievements", newItem);
    setNewItem({ title: "", organization: "", icon: "trophy" });
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artist.achievements.map((ach, i) => (
        <Card key={i} hoverLift className="p-6 flex items-start gap-4 relative group border-none shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#F2F6FA] flex items-center justify-center flex-shrink-0">
            {ach.icon === "trophy" && <Trophy className="w-5 h-5 text-songdew-blue" />}
            {ach.icon === "disc" && <Disc className="w-5 h-5 text-songdew-blue" />}
            {ach.icon === "activity" && <Activity className="w-5 h-5 text-songdew-blue" />}
          </div>
          <div className="pr-6">
            <h4 className="font-heading font-semibold text-[18px] text-songdew-text leading-tight">{ach.title}</h4>
            <p className="font-body text-[14px] text-songdew-gray mt-1">{ach.organization}</p>
          </div>
          {isEditing && (
            <button 
              onClick={() => removeSectionItem("achievements", i)}
              className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </Card>
      ))}
      {isEditing && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 rounded-[16px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2 hover:bg-black/5 transition-colors"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Achievement</span>
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Achievement">
        <div className="flex flex-col gap-4">
          <Input label="Achievement Title" value={newItem.title} onChange={v => setNewItem({...newItem, title: v})} placeholder="Best Pop Artist" />
          <Input label="Organization" value={newItem.organization} onChange={v => setNewItem({...newItem, organization: v})} placeholder="GIMA Awards" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Icon</label>
            <select 
              value={newItem.icon} 
              onChange={e => setNewItem({...newItem, icon: e.target.value})}
              className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
            >
              <option value="trophy">Trophy</option>
              <option value="disc">Vinyl/Disc</option>
              <option value="activity">Waveform/Activity</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Achievement</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function PressSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", logoUrl: "" });

  const handleAdd = () => {
    addSectionItem("press", newItem);
    setNewItem({ name: "", logoUrl: "" });
    setIsModalOpen(false);
  };

  return (
    <Card className="p-8 relative border-none shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-heading font-bold text-xl text-songdew-text">In Press</h3>
        {isEditing && (
          <Button size="sm" variant="secondary" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Publication
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-12 items-center justify-center">
        {artist.press.map((p, i) => (
          <div key={i} className="relative group flex items-center justify-center">
            <img src={p.logoUrl} alt={p.name} className="h-8 object-contain opacity-50 hover:opacity-100 transition-opacity grayscale" />
            {isEditing && (
              <button 
                onClick={() => removeSectionItem("press", i)}
                className="absolute -top-4 -right-4 p-1.5 bg-red-500 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
        {artist.press.length === 0 && !isEditing && (
          <div className="py-4 text-center text-songdew-gray font-body">No press mentions yet.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Press Publication">
        <div className="flex flex-col gap-5">
          <Input label="Publication Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Rolling Stone" />
          <FileUpload 
            label="Upload Publication Logo" 
            accept="image/*" 
            onFileSelect={url => setNewItem({...newItem, logoUrl: url})} 
            previewUrl={newItem.logoUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Publication</Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}

function AssetsSection() {
  const { artist, isEditing, addSectionItem, removeSectionItem } = useArtist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", size: "", type: "image", fileUrl: "" });

  const handleAdd = () => {
    addSectionItem("assets", newItem);
    setNewItem({ name: "", size: "", type: "image", fileUrl: "" });
    setIsModalOpen(false);
  };

  const assets = artist.assets || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset: any, i: number) => (
        <Card key={i} hoverLift className="p-6 flex items-center gap-4 relative group border-none shadow-sm">
          <div className="w-12 h-12 rounded-[12px] bg-[#F2F6FA] flex items-center justify-center flex-shrink-0">
            {asset.type === "image" ? <ImageIcon className="w-5 h-5 text-songdew-blue" /> : <FileText className="w-5 h-5 text-songdew-blue" />}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-heading font-semibold text-[16px] text-songdew-text truncate">{asset.name}</h4>
            <p className="font-body text-[13px] text-songdew-gray mt-0.5">{asset.size}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-songdew-gray hover:text-songdew-blue transition-colors">
              <Download className="w-4 h-4" />
            </button>
            {isEditing && (
              <button 
                onClick={() => removeSectionItem("assets", i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>
      ))}
      
      {isEditing && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 rounded-[16px] border border-dashed border-black/10 flex flex-col items-center justify-center gap-2 hover:bg-black/5 transition-colors"
        >
          <Plus className="w-6 h-6 text-songdew-gray" />
          <span className="font-body text-sm text-songdew-gray font-medium">Add Asset</span>
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Asset">
        <div className="flex flex-col gap-5">
          <Input label="File Name" value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} placeholder="Press Kit.pdf" />
          <Input label="File Size" value={newItem.size} onChange={v => setNewItem({...newItem, size: v})} placeholder="2.4 MB" />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-heading font-semibold text-songdew-text">Type</label>
            <select 
              value={newItem.type} 
              onChange={e => setNewItem({...newItem, type: e.target.value})}
              className="h-12 px-4 rounded-[12px] border border-black/10 outline-none font-body text-[15px] bg-white"
            >
              <option value="image">Image / Zip</option>
              <option value="document">Document / PDF</option>
            </select>
          </div>
          <FileUpload 
            label="Upload File" 
            accept="*/*" 
            onFileSelect={url => setNewItem({...newItem, fileUrl: url})} 
            previewUrl={newItem.fileUrl}
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Asset</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EmptyStateCard({ 
  icon, 
  title, 
  cta, 
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  cta: string,
  onClick?: () => void
}) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 p-8 border border-dashed border-black/10 bg-transparent shadow-none h-full min-h-[200px]">
      <div className="w-12 h-12 rounded-full bg-[#F2F6FA] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <h4 className="font-heading font-semibold text-songdew-text">{title}</h4>
        <p className="font-body text-sm text-songdew-gray mt-1">Nothing here yet</p>
      </div>
      <Button variant="secondary" size="sm" className="mt-2" onClick={onClick}>{cta}</Button>
    </Card>
  );
}

function Input({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-heading font-semibold text-songdew-text">{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={e => onChange(e.target.value)}
        className="h-12 px-4 rounded-[12px] border border-black/10 focus:border-songdew-blue focus:ring-1 focus:ring-songdew-blue outline-none font-body text-[15px]" 
        placeholder={placeholder}
      />
    </div>
  );
}
