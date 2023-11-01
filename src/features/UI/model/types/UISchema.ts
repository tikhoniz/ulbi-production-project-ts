// Record объект где <ключ - Адрес страницы, значение - позиция скролла>
export type ScrollSchema = Record<string, number>

export interface UISchema {
  scroll: ScrollSchema
}
