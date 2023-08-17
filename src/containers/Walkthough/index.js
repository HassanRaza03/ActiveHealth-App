import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {CustomNavbar} from '../../components';
import WalkthoughBottom from '../../components/WalkThoughBottom';
import {setFirstTime} from '../../redux/slicers/gerenal';
import {Colors, Images} from '../../theme';
import styles from './styles';
export default function Walkthough() {
  const flatListRef = useRef(null);
  const nagivate = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const data = [
    {
      image: Images.walktroughone,
    },
    {
      image: Images.walktroughtwo,
    },
  ];

  const _handleNext = index => {
    if (index == 1) {
      dispatch(setFirstTime(false));
      nagivate.navigate('login');
    } else {
      flatListRef?.current?.scrollToEnd();
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.background.primary}}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setFirstTime(false));
          nagivate.navigate('login');
        }}
        style={styles.skipBtnView}>
        <Text style={styles.skipBtnTxt}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        horizontal
        ref={flatListRef}
        data={data}
        onScroll={onScroll =>
          setActiveIndex(onScroll.nativeEvent.contentOffset.x)
        }
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => String(i)}
        contentContainerStyle={{flexGrow: 1}}
        renderItem={({item}) => {
          return (
            <ImageBackground
              source={item.image}
              style={[
                styles.container,
                {width: Dimensions.get('screen').width},
              ]}></ImageBackground>
          );
        }}
      />
      <View style={styles.messagetxt}>
        <View style={styles.goalTxtView}>
          <Text style={styles.goalTxt}>PERSONAL GOALS</Text>
          <Text style={styles.goalTxtMessage}>
            Track and analyse your personal goals & progress
          </Text>
        </View>
        <WalkthoughBottom
          step={activeIndex < 200 ? 1 : 2}
          onPress={() => {
            _handleNext(activeIndex < 200 ? 0 : 1);
          }}
        />
      </View>
    </View>
  );
}
