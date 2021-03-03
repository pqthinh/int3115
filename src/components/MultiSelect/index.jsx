import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Text, FlatList, TextInput } from "react-native";

import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from "./style";

import AntIcons from 'react-native-vector-icons/AntDesign'

import Modal from "react-native-modal";
import { Button } from "react-native-paper";

const MultiSelect = (props) => {
  const {
    data,
    selectedItems,
    uniqueKey,
    displayKey,
    selectText,
    searchInputPlaceholderText,
    submitButtonText,
    onSelectedItemsChange
  } = props;

  const [listOption, setListOption] = useState(data)
  const [isVisibleModal, setVisibleModal] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(()=>{
    const newListOption = data && data.filter(item => item[displayKey].includes(searchText))
    setListOption(newListOption)
  }, [searchText])

  const onToggleModal = useCallback(()=> {
    setVisibleModal(!isVisibleModal)
  })

  const removeItem = useCallback((item)=> {
    const cloneSelected = [...selectedItems]
    const index = cloneSelected.findIndex(selectItem => selectItem[uniqueKey] === item[uniqueKey]);
    if (index > -1) {
      cloneSelected.splice(index, 1);
    }
    onSelectedItemsChange(cloneSelected)
  })

  const onChooseItem = useCallback((item, isSelected)=> { 
    if(isSelected) {
      removeItem(item)
      return
    }

    const newSelected = [...selectedItems]
    newSelected.push(item)
    onSelectedItemsChange(newSelected)
    })

  const renderOptionItem = ({item}) => {
    const isSelected = selectedItems.length > 0 && selectedItems.find(selectItem => selectItem[uniqueKey] === item[uniqueKey])
    return <Pressable style={styles.chooseItemWrapper} onPress={()=>onChooseItem(item, isSelected)}>
      <Text style={[styles.chooseItemLabel, {fontWeight: isSelected? 'bold': '300'}]}>{item[displayKey]}</Text>
      {isSelected && <AntIcons name={'check'} size={16} color={'#00c288'}/>}
    </Pressable>
  }

  const renderSelectModal = () => {
    return (
      <Modal
        isVisible={isVisibleModal}
        backdropOpacity={0.4}
        onBackdropPress={onToggleModal}
        onSwipeComplete={onToggleModal}
        swipeDirection="down"
        propagateSwipe
        style={styles.modalWrapper}
      >
        <View style={styles.formWrapper}>
          <View style={styles.modalHeader}>
            <TextInput style={styles.searchInput} placeholder={searchInputPlaceholderText} value={searchText} onChangeText={setSearchText}/>
            {searchText !== '' && <Pressable onPress={()=> setSearchText('')}>
              <AntIcons name={'closecircleo'} size={14} color={"#5f5f5f"} />
            </Pressable> }
            
          </View>
          <View style={styles.modalBody}>
            <FlatList 
              data={listOption}
              renderItem={renderOptionItem} 
              keyExtractor={(item, index)=> `option-item-${index}`}
            />
          </View>
          <View style={styles.footerWrapper}>
            <Pressable style={styles.modalButton} onPress={onToggleModal}>
              <Text style={styles.modalButtonLabel}>{submitButtonText || 'Submit'}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  const renderSelectedBox = () => {
    if(selectedItems && selectedItems.length) return null

    return <View style={styles.selectedContainer}>
      <Text style={styles.chooseItemText}>{selectText || '選択してください'}</Text>
      <AntIcons name={'caretdown'} color={'#5f5f5f'} size={18}/>
    </View>
  }

  const renderSelectedItem = ({item}) =>{
    return <View style={styles.selectedItemWrapper}>
      <Text style={styles.selectedItemText}>{item[displayKey]}</Text>
      <Pressable onPress={()=> removeItem(item)}>
      <AntIcons name={'closecircleo'} size={14} color={"#5f5f5f"} /></Pressable>
    </View>
  }

  const renderListSelected = () => {
    if(!selectedItems || !selectedItems.length) return null
    return (
      <View style={styles.selectContainer}>
      <FlatList
        contentContainerStyle={styles.listSelected}
        numColumns={3} 
        data={selectedItems} 
        renderItem={renderSelectedItem} 
        keyExtractor={(item, index)=> `selected-item-${index}`} 
      />
        <AntIcons style={styles.dropDownIcon} name={'caretdown'} color={'#5f5f5f'} size={18}/>
      </View>
    )
  }

  return (
    <Pressable style={styles.container}  onPress={onToggleModal}>
      {renderSelectedBox()}
      {renderListSelected()}
      {renderSelectModal()}
    </Pressable>
  );
};

export default MultiSelect;
