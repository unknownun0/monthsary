export interface StoryMilestone {
  title: string;
  description: string;
  image: string;
  caption: string;
}

export interface MemoryItem {
  title: string;
  image: string;
  caption: string;
}

export interface StickyNote {
  title: string;
  message: string;
  color: string;
  rotate: number;
}

export interface Coupon {
  title: string;
  description: string;
  emoji: string;
}

export interface EnvelopeItem {
  title: string;
  content: string;
  type: 'message' | 'image' | 'voice' | 'surprise';
  image?: string;
}

export interface DreamDate {
  title: string;
  emoji: string;
  description: string;
}
