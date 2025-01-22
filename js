import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  Switch, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ImageBackground 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    loadTasks();
  }, []);

  const fetchCategories = async () => {
    const mockCategories = ['Academic', 'Personal', 'Work'];
    setCategories(mockCategories);
  };

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  const saveTask = async () => {
    if (!taskName || !taskDeadline || !taskCategory) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      deadline: taskDeadline,
      category: taskCategory,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTaskName('');
    setTaskDeadline('');
    setTaskCategory('');
  };

  const toggleTaskStatus = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const filterTasks = () => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <ImageBackground
      source={require('./assetsuniversity-background.png')} 
      style={styles.background}
    >
      <View style={[styles.container, isDarkMode && styles.darkMode]}>
        <View style={styles.themeToggleContainer}>
          <Text style={[styles.themeText, isDarkMode && styles.darkText]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Search Tasks"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={setTaskName}
        />

        <TextInput
          style={styles.input}
          placeholder="Task Deadline (e.g. 2025-01-25)"
          value={taskDeadline}
          onChangeText={setTaskDeadline}
        />

        <Picker
          selectedValue={taskCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setTaskCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>

        <Button title="Add Task" onPress={saveTask} />

        <FlatList
          data={filterTasks()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.taskItem, item.completed && styles.completedTask]}
              onPress={() => toggleTaskStatus(item.id)}
            >
              <Text style={styles.taskName}>{item.name}</Text>
              <Text style={styles.taskDetails}>
                {item.deadline} - {item.category}
              </Text>
              <Text style={styles.status}>{item.completed ? 'Completed' : 'Pending'}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency over the image
  },
  darkMode: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  themeText: {
    color: '#000',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  taskItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  completedTask: {
    backgroundColor: '#d3ffd3',
  },
  taskName: {
    fontWeight: 'bold',
  },
  taskDetails: {
    color: '#888',
  },
  status: {
    marginTop: 5,
    fontStyle: 'italic',
  },
});


