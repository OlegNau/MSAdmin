export type StubKind = 'projects' | 'default';

export interface StubConfig {
  /** Большой заголовок */
  title: string;
  /** Описание под заголовком */
  description?: string;
  /** Имя иконки (lucide или <svg> слотом в шаблоне) */
  icon?: string;
  /** Текст кнопки (если отсутствует — кнопка скрыта) */
  primaryLabel?: string;
}

/** Базовые пресеты, как в merge-sensey, без i18n для упрощения (TODO: i18n) */
export const STUB_CONFIGS: Record<StubKind, StubConfig> = {
  projects: {
    title: 'No projects yet',
    description: 'Create your first project to start connecting repositories and pipelines.',
    icon: 'folder-plus',
    primaryLabel: 'Create project',
  },
  default: {
    title: 'Nothing here',
    description: 'There is no data to display yet.',
    icon: 'file-question',
  },
};
