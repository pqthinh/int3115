import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DropdownPicker from "../../utils/pickers/pickerSelect";
import _ from "lodash";

import {fetchCities, fetchZipcode} from "../../features/home/redux/actions";

import { useLoading } from "../../hooks";

import { connect } from "react-redux";
import { styles } from "./style";

const Prefectures = (props) => {
  const { prefectures, _handleChangeData, data, setData, fetchCities, fetchZipcode, cities, zipcode_data, requesting } = props;
  const { width } = Dimensions.get("window");
  const [listCity, setListCity] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [preVal, setPreVal] = useState(data.prefecture || null);
  const [cityVal, setCityVal] = useState(data.city || null);
  const [isSearch, setIsSearch] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    if (data.prefecture !== 0 && !isSearch) {
      setListCity([])
      fetchCities(data.prefecture)
    }
  }, [data.prefecture])

  useEffect(() => {
    const have_zip = _.isEmpty(zipcode_data)
    if (!have_zip) {
      const {city, prefecture} = zipcode_data
      try {
        fetchCities(prefecture.id)
      } catch (e) {
        console.log(e, 'Error')
      } finally {
        setIsSearch(false)
        setPreVal(prefecture.id)
        setCityVal(city.id)
        setData({...data, "prefecture": prefecture.id})
      }
    }
  }, [zipcode_data])
  
  useEffect(() => {
    const disabled = Boolean(data.prefecture === 0) && !requesting
    setIsDisabled(disabled)
    setListCity(cities)
  }, [cities])

  useEffect(() => {
    setLoading(requesting || false);
  }, [requesting]);

  const searchZipcode = () => {
    setIsSearch(true)
    setPreVal(null)
    setCityVal(null)
    fetchZipcode(data.zipcode)
  }

  const renderPrefectures = () => {
    return (
      <View>
        <View style={styles.blockInput}>
          <View style={styles.blockLabel}>
            <Text style={styles.titleLabel}>郵便番号</Text>
            <Text style={styles.textMark}>必要</Text>
          </View>
          <View style={styles.textInputGroup}>
            <TextInput
              placeholder="郵便番号"
              value={data.zipcode}
              onChangeText={_handleChangeData("zipcode")}
              mode="outlined"
              style={[styles.textInput, { width: (3 * width) / 5 }]}
            />
            <TouchableOpacity onPress={searchZipcode}>
              <Text style={styles.btnSearch}>住所検索</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textInputNote}>
            ※ハイフン無しの半角数字7桁
          </Text>
        </View>
        <View style={styles.blockInput}>
          <View style={styles.blockLabel}>
            <Text style={styles.titleLabel}>都道府県</Text>
            <Text style={styles.textMark}>必要</Text>
          </View>
          <View style={styles.dropDown100}>
            <DropdownPicker
              dataPicker={prefectures}
              data={data}
              setData={setData}
              field="prefecture"
              value={preVal}
              isSearch={isSearch}
            />
          </View>
          <View style={styles.blockLabel}>
            <Text style={styles.titleLabel}>市区町村</Text>
            <Text style={styles.textMark}>必要</Text>
          </View>
          <View style={styles.dropDown100}>
            <DropdownPicker
              dataPicker={listCity}
              data={data}
              setData={setData}
              field="city"
              value={cityVal}
              isSearch={isSearch}
              disabled={isDisabled}
            />
          </View>
          <View style={styles.blockLabel}>
            <Text style={styles.titleLabel}>番地以降</Text>
            <Text style={styles.textMark}>必要</Text>
          </View>
          <View style={styles.dropDown100}>
              <TextInput
                placeholder="番地以降"
                value={data.town}
                onChangeText={_handleChangeData("town")}
                mode="outlined"
                style={[styles.textInput]}
              />
          </View>
          <Text style={styles.textInputNote}>
            ※現在住んでいる所をご記入ください
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderPrefectures()}
    </View>
  );
};

export default connect(
    (state) => ({
      prefectures: state.homeReducer.prefectures,
      cities: state.homeReducer.cities,
      zipcode_data: state.homeReducer.zipcode_data,
      requesting: state.homeReducer.requesting,
    }),
    {
      fetchCities,
      fetchZipcode
    }
  )(Prefectures);
