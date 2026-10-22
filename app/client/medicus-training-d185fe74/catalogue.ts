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
    { id: 'dispenser', label: 'Dispenser' },
  ],

  focuses: [
    { id: 'getting-started', label: 'Getting started' },
    { id: 'day-to-day', label: 'Day to day' },
    { id: 'clinical', label: 'Clinical' },
    { id: 'management', label: 'Practice management' },
  ],

  // Production tiers: how much cost, development and time a video takes to make.
  // The example videos below are style references at each level.
  tiers: [
    { id: 'low', label: 'Low cost / effort' },
    { id: 'mid', label: 'Mid cost / effort' },
    { id: 'premium', label: 'Premium' },
  ],

  // Words that mean the same thing, so a search for "booking" finds a video
  // about "appointments". Add to these as real searches show gaps.
  synonyms: [
    ['appointment', 'booking', 'book', 'schedule', 'diary', 'slot'],
    ['prescription', 'prescribing', 'medication', 'medicine', 'repeat', 'drug'],
    ['record', 'notes', 'chart', 'history', 'consultation'],
    ['report', 'data', 'analytics', 'dashboard', 'audit', 'statistics'],
    ['dispensing', 'dispense', 'dispenser', 'dispensary', 'pharmacy'],
    ['admin', 'administration', 'back office', 'office'],
    ['login', 'log in', 'sign in', 'access', 'getting started', 'onboarding', 'welcome'],
  ],

  // The first five are placeholders until the real videos arrive. To publish one, set `source`
  // (see VideoSource in lib/training/types.ts), then remove `placeholder`.
  videos: [
    {
      id: 'welcome-getting-started',
      icon: 'sparkles',
      title: 'Welcome and getting started',
      summary: 'Placeholder. A short tour to find your way around.',
      roles: 'all',
      focus: ['getting-started'],
      keywords: ['login', 'overview', 'first day'],
      source: null,
      placeholder: true,
    },
    {
      id: 'dispensing',
      icon: 'pill',
      title: 'Dispensing with Medicus',
      summary: 'Placeholder. Video coming soon.',
      roles: ['dispenser', 'admin'],
      focus: ['day-to-day'],
      keywords: ['dispensing', 'prescription', 'medication'],
      source: null,
      placeholder: true,
    },
    {
      id: 'reporting',
      icon: 'chart',
      title: 'Reporting for practice management',
      summary: 'Placeholder. Video coming soon.',
      roles: ['practice-manager', 'gp-partner'],
      focus: ['management'],
      keywords: ['reports', 'data', 'dashboard'],
      source: null,
      placeholder: true,
    },
    {
      id: 'back-office-admin',
      icon: 'briefcase',
      title: 'Back office administration',
      summary: 'Placeholder. Video coming soon.',
      roles: ['practice-manager', 'admin'],
      focus: ['management'],
      keywords: ['admin', 'back office', 'administration'],
      source: null,
      placeholder: true,
    },
    {
      id: 'clinic-nurse-workflow',
      icon: 'stethoscope',
      title: 'Clinic nurse workflow',
      summary: 'Placeholder. Video coming soon.',
      roles: ['nurse'],
      focus: ['day-to-day', 'clinical'],
      keywords: ['nurse', 'clinic', 'workflow'],
      source: null,
      placeholder: true,
    },
    {
      id: 'low-1',
      title: 'Low cost example 1',
      summary: 'Airtable',
      roles: 'all',
      focus: [],
      keywords: ['airtable', 'low cost', 'low effort'],
      tier: 'low',
      source: { type: 'youtube', id: 'Tss5hNneiD4' },
    },
    {
      id: 'mid-1',
      title: 'Mid cost example 1',
      summary: 'Loom',
      roles: 'all',
      focus: [],
      keywords: ['loom', 'mid cost', 'mid effort'],
      tier: 'mid',
      source: { type: 'loom', id: '473fad25ebd24b5ea8091503253dfecf' },
    },
    {
      id: 'mid-2',
      title: 'Mid cost example 2',
      summary: 'Xero',
      roles: 'all',
      focus: [],
      keywords: ['xero', 'mid cost', 'mid effort'],
      tier: 'mid',
      source: { type: 'youtube', id: '-s4AY38Mdts' },
    },
    {
      id: 'premium-1',
      title: 'Premium example 1',
      summary: 'Slack',
      roles: 'all',
      focus: [],
      keywords: ['slack', 'premium', 'top tier'],
      tier: 'premium',
      source: { type: 'youtube', id: 'EDATYbzYGiE' },
    },
    {
      id: 'premium-2',
      title: 'Premium example 2',
      summary: 'Notion',
      roles: 'all',
      focus: [],
      keywords: ['notion', 'premium', 'top tier'],
      tier: 'premium',
      source: { type: 'youtube', id: 'oTahLEX3NXo' },
    },
    {
      id: 'premium-3',
      title: 'Premium example 3',
      summary: 'Monday',
      roles: 'all',
      focus: [],
      keywords: ['monday', 'premium', 'top tier'],
      tier: 'premium',
      source: { type: 'youtube', id: 'T3qH-uY3t-Y' },
    },
    {
      id: 'premium-4',
      title: 'Premium example 4',
      summary: 'Intercom',
      roles: 'all',
      focus: [],
      keywords: ['intercom', 'premium', 'top tier'],
      tier: 'premium',
      source: { type: 'youtube', id: '6xQO5Rjz-v8' },
    },
    {
      id: 'premium-5',
      title: 'Premium example 5',
      summary: 'Superhuman',
      roles: 'all',
      focus: [],
      keywords: ['superhuman', 'premium', 'top tier'],
      tier: 'premium',
      source: { type: 'youtube', id: 'DjR8G1bE5ss' },
    },
  ],
};
