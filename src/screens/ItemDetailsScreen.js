// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const ItemDetailsScreen = ({ route, navigation }) => {
//     const { item } = route.params;
  
//     return (
//       <View style={styles.container}>
//         <Text>{item.name}</Text>
//         <Text>{item.price}</Text>
//         <Text>{item.description}</Text>
//         <Button
//           title="Add to Cart"
//           onPress={() => Alert.alert('Item added to cart')}
//         />
//         <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//           <Text>Go to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

// export default ItemDetailsScreen

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 16,
//       backgroundColor: '#fff',
//     },
//     input: {
//       borderWidth: 1,
//       borderColor: '#ccc',
//       padding: 8,
//       marginBottom: 16,
//       borderRadius: 4,
//     },
//     listItem: {
//       padding: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#ccc',
//     },
//   });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

const ProductDetailsScreen = ({route,navigation}) => {
  const [quantity, setQuantity] = useState(1);
  const {item} = route.params
  console.log('cheking details',JSON.stringify(item));
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      {/* Header */}

      <ImageBackground style={{width:'100%',height:200,borderCurve:'circular'}} source={item?.image}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={()=>navigation.goBack()}
         style={styles.backContainer}>
            <Text style={{textAlign:'center',fontSize:25}}>{'<'}</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productSubTitle}>{item.restaurant}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ 4.7</Text>
          <Text style={styles.infoText}>Free</Text>
          <Text style={styles.infoText}>20 min</Text>
        </View>
        <Text style={styles.productDescription}>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet.
        </Text>

        {/* Size Options */}
        <Text style={styles.sectionTitle}>SIZE:</Text>
        <View style={styles.sizeOptions}>
          <TouchableOpacity style={styles.sizeButton}>
            <Text style={styles.sizeText}>10"</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sizeButton, styles.sizeButtonActive]}>
            <Text style={[styles.sizeText, styles.sizeTextActive]}>14"</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sizeButton}>
            <Text style={styles.sizeText}>16"</Text>
          </TouchableOpacity>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>INGREDIENTS:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={styles.ingredientIcon}>
              <Text>🥩</Text>
            </View>
          ))}
        </ScrollView>

        {/* Price and Quantity */}
        <View style={styles.footer}>
          <Text style={styles.priceText}>${parseInt(item?.price)* quantity}</Text>
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
        {/* Add to Cart Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart',
        {quantity:quantity,image:item?.image,name:item.name,price:item?.price})} style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor:'#00000000',
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerButtonText: {
    fontSize: 18,
  },
  imageContainer: {
    backgroundColor: "#f8c291",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode:'stretch'
  },
  backContainer:{height:50,width:50,borderRadius:25,backgroundColor:'#f0f5fb',alignItems:'center',justifyContent:'center'},
  subContainer:{backgroundColor:'white',
  height:'100%',
  borderRadius:20,
  padding:16,
  alignItems:'center',
  },
  detailsContainer: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productSubTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#f39c12",
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginRight: 16,
  },
  productDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  sizeOptions: {
    flexDirection: "row",
    marginBottom: 16,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sizeButtonActive: {
    backgroundColor: "#f39c12",
    borderColor: "#f39c12",
  },
  sizeText: {
    fontSize: 14,
    color: "#666",
  },
  sizeTextActive: {
    color: "#fff",
  },
  ingredientIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    elevation: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 8,
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
  addToCartButton: {
    backgroundColor: "#f39c12",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  addToCartText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;
