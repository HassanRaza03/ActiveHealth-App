import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../theme';

export default function Welcome() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: Colors.text.primary, fontSize: 32}}>AP</Text>
      </View>
      <Text style={{color: Colors.white, fontSize: 40, marginTop: 10}}>
        AP WELLNESS
      </Text>
    </View>
  );
}
