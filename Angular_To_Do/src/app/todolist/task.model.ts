export interface Task {
 
  taskName: string;
  isCompleted: boolean;
  isEditable: boolean;
  dateTime: Date;
  dueDate: Date;
  isImportant?: boolean; 
}

