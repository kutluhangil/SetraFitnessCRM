export type Locale = 'tr' | 'en';
export type Currency = 'TRY' | 'USD' | 'EUR';
export type SubscriptionStatus = 'trialing' | 'active' | 'paused' | 'cancelled' | 'expired';
export type ClientStatus = 'active' | 'inactive' | 'paused' | 'archived';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
export type PaymentMethod = 'cash' | 'transfer' | 'card' | 'other';
export type MessageChannel = 'in_app' | 'email' | 'whatsapp' | 'sms';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  business_name: string | null;
  timezone: string;
  locale: Locale;
  currency: Currency;
  ls_customer_id: string | null;
  ls_subscription_id: string | null;
  ls_variant_id: string | null;
  subscription_status: SubscriptionStatus;
  subscription_ends_at: string | null;
  client_limit: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  coach_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  status: ClientStatus;
  notes: string | null;
  tags: string[];
  emergency_contact: string | null;
  emergency_phone: string | null;
  height_cm: number | null;
  start_weight_kg: number | null;
  goal_weight_kg: number | null;
  fitness_level: FitnessLevel | null;
  medical_notes: string | null;
  monthly_fee: number | null;
  payment_day: number | null;
  payment_method: PaymentMethod | null;
  joined_at: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  client_id: string;
  coach_id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  payment_method: PaymentMethod | null;
  due_date: string;
  paid_at: string | null;
  period_start: string | null;
  period_end: string | null;
  notes: string | null;
  reminder_sent: boolean;
  reminder_sent_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  coach_id: string;
  client_id: string;
  direction: 'outgoing' | 'incoming';
  channel: MessageChannel;
  subject: string | null;
  body: string;
  is_automated: boolean;
  automation_id: string | null;
  read_at: string | null;
  sent_at: string;
  created_at: string;
}

export interface ProgressEntry {
  id: string;
  client_id: string;
  coach_id: string;
  recorded_at: string;
  weight_kg: number | null;
  body_fat_percentage: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
  arm_cm: number | null;
  thigh_cm: number | null;
  notes: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile> & { id: string; email: string; full_name: string }; Update: Partial<Profile> };
      clients: { Row: Client; Insert: Partial<Client> & { coach_id: string; full_name: string }; Update: Partial<Client> };
      payments: { Row: Payment; Insert: Partial<Payment> & { coach_id: string; client_id: string; amount: number; due_date: string }; Update: Partial<Payment> };
      messages: { Row: Message; Insert: Partial<Message> & { coach_id: string; client_id: string; direction: 'outgoing' | 'incoming'; body: string }; Update: Partial<Message> };
      progress_entries: { Row: ProgressEntry; Insert: Partial<ProgressEntry> & { coach_id: string; client_id: string }; Update: Partial<ProgressEntry> };
    };
  };
}
