export const fontSize = 16;
export const iconSize = 22;
export const btnTxtSize = 14;
export const btnStyle = {
  padding: 5,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#e2e6ea',
  backgroundColor: '#dae0e5'
};
export const btnTxtStyle = {
  fontSize: btnTxtSize,
  color: '#212529'
};

export const styles = {
  fontColor: '#ffffff',
  fontSize: fontSize,
  iconSize: iconSize,
  appBackgroundColors: ['#4776E6', '#8E54E9'],
  btn: {
    ...btnStyle
  },
  btnText: {
    ...btnTxtStyle
  },
  btnActive: {
    ...btnStyle,
    ...{
      borderColor: '#007bff',
      backgroundColor: '#007bff'
    }
  },
  btnTextActive: {
    ...btnTxtStyle, 
    ...{
      color: '#fff'
    }
  },
  modalBackdrop:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalStyle: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    color: '#333',
    elevation: 5,
    shadowOffset: { height: 4, width: 0 },
    shadowColor: '#000000',
    shadowOpacity: 0.6,
    width: '90%',
    height: 'auto'
  }
}
