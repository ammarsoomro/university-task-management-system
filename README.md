Project Overview
The application is designed to help users organize and manage their tasks in an intuitive and user-friendly interface. It incorporates dynamic state management, persistent data storage, and theme customization. The main features include:

1. Task Management
Add Tasks: Users can input the task name, deadline, and category to add a new task to the list.
Mark Completion: Tasks can be toggled between "Pending" and "Completed" status with a single click.
Filter Tasks: A search bar enables users to filter tasks by name.
2. Categorization
Task Categories: Tasks can be assigned to predefined categories such as "Academic," "Personal," or "Work."
Dropdown Picker: A picker component is used for selecting a category when adding a new task.
3. Persistent Storage
AsyncStorage Integration: Tasks are saved locally using AsyncStorage, ensuring persistence even when the app is closed and reopened.
4. Dark Mode Support
Theme Customization: Users can toggle between light and dark modes for better visual comfort.
Dynamic Styling: The app dynamically updates the UI based on the selected theme.
5. User-Friendly UI
Image Background: The app uses a background image (university-background.png) to provide a visually appealing backdrop.
FlatList Rendering: The tasks are displayed in a scrollable list format with intuitive design and color-coded styles for pending and completed tasks.
Input Validation: Alerts are shown if the user attempts to add a task without filling in all required fields.
Technical Highlights
State Management: The app uses React's useState hook for managing various states like tasks, categories, dark mode, and search queries.
Effect Hooks: The useEffect hook ensures categories are fetched, and tasks are loaded when the app initializes.
Dynamic Rendering: Conditional styling and real-time updates make the app interactive and responsive.
Reusable Components: Components like Picker, FlatList, and Switch are effectively used to simplify the design.
Features for Future Enhancement
Task Editing: Allow users to edit existing tasks.
Category Customization: Enable users to create and manage custom categories.
Notifications: Add reminders for tasks based on their deadlines.
Cloud Sync: Integrate with cloud services to sync tasks across devices.
Animation Effects: Add animations for task transitions and UI interactions.
