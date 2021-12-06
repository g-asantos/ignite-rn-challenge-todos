import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/pen/edit.png'
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather';
import { useEffect, useRef, useState } from 'react';

interface taskItemProps {
    index: number;
    toggleTaskDone:  (id: number) => void;
    removeTask: (id: number) => void;
    item: Task;
    editTask: (taskId: number, taskNewTitle: string ) => void;
}

export function TaskItem({index, toggleTaskDone, item, removeTask, editTask}: taskItemProps){
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if(isBeingEditted){
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isBeingEditted]);

  function handleStartEditing(){
    setIsBeingEditted(true);
  }

  function handleCancelEditing(){
    setTaskTitle(item.title);
    setIsBeingEditted(false);
  }

  function handleSubmitEditing(){
    editTask(item.id, taskTitle);
    setIsBeingEditted(false);
  };

  return (
      <>
    <View>
    <TouchableOpacity
      testID={`button-${index}`}
      activeOpacity={0.7}
      style={styles.taskButton}
      onPress={() => toggleTaskDone(item.id)}
    >
      <View 
        testID={`marker-${index}`}
        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
      >
        { item.done && (
          <Icon 
            name="check"
            size={12}
            color="#FFF"
          />
        )}
      </View>

      <TextInput 
        style={item.done ? styles.taskTextDone : styles.taskText}
        value={taskTitle}
        onChangeText={(text) => setTaskTitle(text)}
        editable={isBeingEditted}
        onSubmitEditing={handleSubmitEditing}
        ref={textInputRef}
      />
    </TouchableOpacity>
  </View>

    <View style={ styles.iconsContainer } >
      { isBeingEditted ? (
        <TouchableOpacity
          onPress={handleCancelEditing}
        >
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleStartEditing}
        >
          <Image source={editIcon} />
        </TouchableOpacity>
      ) }

      <View 
        style={ styles.iconsDivider }
      />

      <TouchableOpacity
        disabled={isBeingEditted}
        onPress={() => removeTask(item.id)}
      >
        <Image source={trashIcon} style={{ opacity: isBeingEditted ? 0.2 : 1 }} />
      </TouchableOpacity>
    </View>
      </>
      );
};

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 24,
    },
    iconsDivider: {
      width: 1,
      height: 24,
      color: 'rgba(196, 196, 196, 0.24)',
      paddingHorizontal: 10,
    },
  })