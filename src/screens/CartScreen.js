import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartScreen = ({route,navigation}) => {
  const item = route.params
  const [quantity, setQuantity] = useState(item?.quantity);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()}
         style={styles.backContainer}>
          <Text style={{textAlign:'center',fontSize:25}}>{'<'}</Text>
        </TouchableOpacity>
          <View style={styles.listItem}>
            <Image style={styles.productImage} source={ item?.image }/>
            <View style={styles.viewStyle}>
            <Text style={styles.logoSubText}>{item?.name}</Text>
            <Text style={styles.logoSubText}>{`Price : $ ${item?.price}`}</Text>
            <Text style={styles.logoSubText}>Quantity: {quantity}</Text>
            </View>
            <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrement}
            >
              <Text style={styles.quantityText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}
            >
              <Text style={styles.quantityText}>+</Text>
            </TouchableOpacity>
          </View>
          </View>

        <Text style={styles.logoSubText}>Total Price: ${item?.price * quantity}</Text>
       </View>
    );
  };

  export default CartScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#121223',
    },
    viewStyle:{marginHorizontal:10},
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 16,
      borderRadius: 4,
    },
    listItem: {
      flexDirection:'row',
      padding: 16,
      marginVertical:15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    productImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    logoSubText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    backContainer:{height:50,width:50,borderRadius:25,backgroundColor:'#f0f5fb',alignItems:'center',justifyContent:'center'},
    subContainer:{backgroundColor:'white',
    height:'100%',
    borderRadius:20,
    padding:16,
    alignItems:'center',
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      borderRadius: 20,
      paddingHorizontal: 8,
      height:'35%'
    },
    quantityButton: {
      width: 32,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    quantityText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    quantityValue: {
      fontSize: 18,
      marginHorizontal: 8,
    },
  });