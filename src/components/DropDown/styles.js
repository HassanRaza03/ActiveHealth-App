import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  txtLogin: {
    width: '100%',
    marginTop: 25,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  labelStyle: {
    color: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#fff',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputViewStyles: {
    borderColor: Colors.white,
    borderBottomWidth: 1,
    width: '100%',
  },
  selectedItem: {
    minWidth: 104,
    height: 31,
    backgroundColor: '#AF36DA',
    opacity: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 7.76,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10.75,
    marginRight: 6,
    paddingLeft: 11,
    paddingRight: 8.33,
  },
  selectedItemIcon: {height: 16, width: 16},
  selectedItemLabel: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 21,
    color: '#fff',
  },
});
