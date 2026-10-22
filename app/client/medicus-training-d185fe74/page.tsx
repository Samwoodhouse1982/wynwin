import type { Metadata } from 'next';
import TrainingHub from '@/components/training/TrainingHub';
import { catalogue } from './catalogue';
import { brand, theme } from './theme';

export const metadata: Metadata = {
  title: { absolute: 'Training library' },
};

export default function MedicusTrainingPage() {
  return <TrainingHub catalogue={catalogue} brand={brand} theme={theme} />;
}
