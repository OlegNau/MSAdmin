export interface ProjectListItem {
  id: string;
  name: string;
  description?: string;
  // TODO(repositories): repository and branch details will be provided by dedicated modules
}
