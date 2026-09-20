export type AppRole = 'super_admin' | 'admin';

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  doctor_name: string;
  tagline: string;
  bio_intro: string;
  bio_body: string;
  bio_outro: string;
  photo_url: string | null;
  contact_email: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  year: number | null;
  full_article_url: string | null;
  pdf_url: string | null;
  sort_order: number;
};

export type ClinicalTrial = {
  id: string;
  title: string;
  description: string;
  link_label: string | null;
  link_url: string | null;
  sort_order: number;
};

export type PresentationLink = {
  id: string;
  presentation_id: string;
  label: string;
  url: string;
  sort_order: number;
};

export type Presentation = {
  id: string;
  title: string;
  presented_at: string | null;
  sort_order: number;
  presentation_links: PresentationLink[];
};

export type Article = {
  id: string;
  title: string;
  body: string | null;
  cover_url: string | null;
  published: boolean;
  sort_order: number;
};

export type Video = {
  id: string;
  title: string;
  video_url: string;
  description: string | null;
  published: boolean;
  sort_order: number;
};

export type Fellowship = {
  id: string;
  title: string;
  subtitle: string | null;
  pdf_url: string | null;
  sort_order: number;
};

export type AdminInvite = {
  email: string;
  role: AppRole;
  created_at: string;
};
