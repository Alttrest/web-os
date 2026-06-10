import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Camera } from 'lucide-react';

const InstaClone = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#000', color: 'white', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #262626' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontFamily: 'serif', fontStyle: 'italic', flex: 1 }}>Instagram</h2>
      </div>

      {/* Feed Post */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
        {/* Post Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', padding: '2px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
              HC
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 600 }}>hackclub</div>
            <div style={{ fontSize: '12px', color: '#a8a8a8' }}>Shelburne, Vermont</div>
          </div>
          <MoreHorizontal size={20} />
        </div>

        {/* Post Image */}
        <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#262626', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
          <Camera size={48} />
          <span style={{ marginTop: '16px', fontSize: '18px', fontWeight: 'bold' }}>Building alttre.os</span>
          <span style={{ fontSize: '14px', marginTop: '8px' }}>No posts yet</span>
        </div>

        {/* Post Actions */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '16px' }}>
          <Heart 
            size={24} 
            color={liked ? "#ff3040" : "white"} 
            fill={liked ? "#ff3040" : "transparent"} 
            onClick={() => setLiked(!liked)} 
            style={{ cursor: 'pointer' }}
          />
          <MessageCircle size={24} />
          <Send size={24} />
          <div style={{ flex: 1 }} />
          <Bookmark size={24} />
        </div>

        {/* Likes & Caption */}
        <div style={{ padding: '0 12px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
            {liked ? '1,025 likes' : '1,024 likes'}
          </div>
          <div style={{ fontSize: '14px' }}>
            <span style={{ fontWeight: 600, marginRight: '8px' }}>hackclub</span>
            Just deployed our brand new ZenithOS theme! Dark mode, minimalist docks, and custom web wrappers. What should we build next? 👇
          </div>
          <div style={{ fontSize: '12px', color: '#a8a8a8', marginTop: '4px' }}>
            2 HOURS AGO
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaClone;
