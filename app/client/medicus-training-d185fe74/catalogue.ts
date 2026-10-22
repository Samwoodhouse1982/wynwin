import type { TrainingCatalogue } from '@/lib/training/types';

// Medicus training catalogue. To add a video, add an entry to `videos` below
// and, if it uses a new role or topic, add that to `roles` or `focuses`.
// Nothing else needs to change: the filters and search read from this file.
//
// The role list follows the audiences on medicus.health (GP partners, practice
// managers) plus a few I have assumed. Check it with the Medicus team.
export const catalogue: TrainingCatalogue = {
  clientId: 'medicus',

  roles: [
    { id: 'gp-partner', label: 'GP partner' },
    { id: 'gp', label: 'GP / clinician' },
    { id: 'nurse', label: 'Nurse / clinical staff' },
    { id: 'practice-manager', label: 'Practice manager' },
    { id: 'admin', label: 'Reception & admin' },
  ],

  focuses: [
    { id: 'getting-started', label: 'Getting started' },
    { id: 'day-to-day', label: 'Day to day' },
    { id: 'clinical', label: 'Clinical' },
    { id: 'management', label: 'Practice management' },
  ],

  // Production tiers. Premium means more development time and cost per video.
  tiers: [
    { id: 'standard', label: 'Standard' },
    { id: 'premium', label: 'Premium' },
  ],

  // Words that mean the same thing, so a search for "booking" finds a video
  // about "appointments". Add to these as real searches show gaps.
  synonyms: [
    ['appointment', 'booking', 'book', 'schedule', 'diary', 'slot'],
    ['prescription', 'prescribing', 'medication', 'medicine', 'repeat', 'drug'],
    ['record', 'notes', 'chart', 'history', 'consultation'],
    ['report', 'data', 'analytics', 'dashboard', 'audit', 'statistics'],
    ['login', 'log in', 'sign in', 'access', 'getting started', 'onboarding', 'welcome'],
  ],

  // Placeholders until the real videos arrive. To publish one, set `source`
  // (see VideoSource in lib/training/types.ts), then remove `placeholder`.
  videos: [
    {
      id: 'welcome-getting-started',
      title: 'Welcome and getting started',
      summary: 'Placeholder. A short tour to find your way around.',
      roles: 'all',
      focus: ['getting-started'],
      keywords: ['login', 'overview', 'first day'],
      tier: 'standard',
      source: null,
      placeholder: true,
    },
    {
      id: 'day-to-day-workflow',
      title: 'Your day-to-day workflow',
      summary: 'Placeholder. The everyday tasks you will do most.',
      roles: ['gp', 'nurse', 'admin'],
      focus: ['day-to-day'],
      keywords: ['appointments', 'daily tasks'],
      tier: 'standard',
      source: null,
      placeholder: true,
    },
    {
      id: 'clinical-records',
      title: 'Clinical records and consultations',
      summary: 'Placeholder. Working with patient notes during a consultation.',
      roles: ['gp-partner', 'gp', 'nurse'],
      focus: ['clinical'],
      keywords: ['records', 'prescribing'],
      tier: 'standard',
      source: null,
      placeholder: true,
    },
    {
      id: 'practice-reporting',
      title: 'Practice management and reporting',
      summary: 'Placeholder. Keeping on top of how the practice is running.',
      roles: ['gp-partner', 'practice-manager'],
      focus: ['management'],
      keywords: ['reports', 'data', 'overview'],
      tier: 'standard',
      source: null,
      placeholder: true,
    },
    {
      id: 'premium-1',
      title: 'Premium example 1',
      summary: 'Title and description to come.',
      roles: 'all',
      focus: [],
      keywords: ['premium'],
      tier: 'premium',
      source: { type: 'youtube', id: 'EDATYbzYGiE' },
    },
    {
      id: 'premium-2',
      title: 'Premium example 2',
      summary: 'Title and description to come.',
      roles: 'all',
      focus: [],
      keywords: ['premium'],
      tier: 'premium',
      source: { type: 'youtube', id: 'oTahLEX3NXo' },
    },
    {
      id: 'premium-3',
      title: 'Premium example 3',
      summary: 'Title and description to come.',
      roles: 'all',
      focus: [],
      keywords: ['premium'],
      tier: 'premium',
      source: { type: 'youtube', id: 'T3qH-uY3t-Y' },
    },
    {
      id: 'premium-4',
      title: 'Premium example 4',
      summary: 'Title and description to come.',
      roles: 'all',
      focus: [],
      keywords: ['premium'],
      tier: 'premium',
      source: { type: 'youtube', id: '6xQO5Rjz-v8' },
    },
    {
      id: 'premium-5',
      title: 'Premium example 5',
      summary: 'Title and description to come.',
      roles: 'all',
      focus: [],
      keywords: ['premium'],
      tier: 'premium',
      source: { type: 'youtube', id: 'DjR8G1bE5ss' },
    },
  ],
};
