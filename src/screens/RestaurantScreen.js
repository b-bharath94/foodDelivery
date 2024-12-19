import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const RestaurantDetailsScreen = ({route,navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState("Burger");
  const {restaurant} = route.params
  console.log('cheking on route',restaurant);

  const categories = ["Burger", "Pasta", "Pizza",];
  const products = [
    {
      id: "1",
      name: "Burger Ferguson",
      restaurant: "Spicy Restaurant",
      price: 30,
      image: require("../assets/burger.jpg"),
      category: "Burger",
    },
    {
      id: "2",
      name: "Rockin' Burgers",
      restaurant: "Cafecafachino",
      price: 40,
      image: require("../assets/pizza.jpg"),
      category: "Burger",
    },
    {
      id: "3",
      name: "Veggie Sandwich",
      restaurant: "Green Delight",
      price: "$30",
      image: require("../assets/pasta.jpg"),
      category: "Sandwich",
    },
    
  ];

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <Image
          source={restaurant.image}
          style={styles.headerImage}
        />
        <View style={styles.headerActions}>
        <TouchableOpacity onPress={()=>navigation.goBack()}
         style={styles.backContainer}>
            <Text style={{textAlign:'center',fontSize:25}}>{'<'}</Text>
        </TouchableOpacity>
        </View>
      </View>

      {/* Restaurant Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {restaurant?.rating}</Text>
          <Text style={styles.infoText}>Free</Text>
          <Text style={styles.infoText}>{restaurant?.deliveryTime}</Text>
        </View>
        <Text style={styles.restaurantName}>{restaurant?.name}</Text>
        <Text style={styles.restaurantDescription}>
          Maecenas sed diam eget risus varius blandit sit amet non magna. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet.
        </Text>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Product Section */}
        <Text style={styles.sectionTitle}>{selectedCategory} (10)</Text>
        <FlatList
          data={filteredProducts}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate('ItemDetails', { item })}
            >
              <View style={styles.productCard}>
              <Image source={ item.image } style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productRestaurant}>{item.restaurant}</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>{`$ ${item.price}`}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
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
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  headerActions: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButton: {
    fontSize: 24,
    color: "#fff",
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 16,
    textAlign: "center",
  },
  detailsContainer: {
    padding: 16,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f39c12",
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginRight: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  restaurantDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: "#f39c12",
    borderColor: "#f39c12",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginRight: 16,
    padding: 8,
    width: 150,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 4,
  },
  productRestaurant: {
    fontSize: 12,
    color: "#666",
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  backContainer:{height:50,width:50,borderRadius:25,backgroundColor:'#f0f5fb',alignItems:'center',justifyContent:'center'},
  subContainer:{backgroundColor:'white',
  height:'100%',
  borderRadius:20,
  padding:16,
  alignItems:'center',
  },
  addButton: {
    backgroundColor: "#f39c12",
    borderRadius: 16,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default RestaurantDetailsScreen;
