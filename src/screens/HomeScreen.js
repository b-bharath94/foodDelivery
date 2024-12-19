import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [greeting, setGreeting] = useState("");
  const navigation = useNavigation();

  const categories = [
    { id: "1", name: "Pizza", image: require("../assets/pizza.jpg"), price: "$70" },
    { id: "2", name: "Burger", image: require("../assets/burger.jpg"), price: "$50" },
    { id: "3", name: "Pasta", image: require("../assets/pasta.jpg"), price: "$60" },
  ];

  const restaurants = [
    {
      id: "1",
      name: "Rose Garden Restaurant",
      category: "Burger · Chicken · Rice · Wings",
      rating: 4.7,
      deliveryTime: "20 min",
      deliveryFee: "Free",
      image: require("../assets/restaurant1.jpg"),
    },
    {
      id: "2",
      name: "Pizza Delight",
      category: "Pizza · Italian · Desserts",
      rating: 4.5,
      deliveryTime: "25 min",
      deliveryFee: "$5",
      image: require("../assets/restaurant2.jpg"),
    },
    {
      id: "3",
      name: "Burger Haven",
      category: "Burger · Fast Food · Drinks",
      rating: 4.8,
      deliveryTime: "15 min",
      deliveryFee: "Free",
      image: require("../assets/restaurant1.jpg"),
    },
  ];

  const determineGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning...!");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon...!");
    } else {
      setGreeting("Good Evening...!");
    }
  };

  useEffect(() => {
    determineGreeting();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backContainer}>
          <Text style={{ textAlign: "center", fontSize: 25 }}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="shopping-cart" size={24} color="#000" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <Text style={styles.greeting}>{`Hey..${greeting}`}</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search dishes, restaurants"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      {/* Categories */}
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryPrice}>Starting {item.price}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />
      </View>

      {/* Restaurants */}
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Restaurant", { restaurant: item });
              }}
            >
              <View style={styles.restaurantCard}>
                <Image source={item.image} style={styles.restaurantImage} />
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantDescription}>{item.category}</Text>
                <View style={styles.restaurantDetails}>
                  <Text style={styles.restaurantRating}>
                    <Icon name="star" size={16} color="#FFD700" /> {item.rating}
                  </Text>
                  <Text style={styles.restaurantDelivery}>{item.deliveryFee}</Text>
                  <Text style={styles.restaurantTime}>{item.deliveryTime}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          style={styles.restaurantList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#f0f5fb",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "#ff0000",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
  },
  greeting: {
    fontSize: 16,
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f5fb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchBar: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 14,
    color: "#007BFF",
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryPrice: {
    fontSize: 12,
    color: "#999",
  },
  restaurantCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantDescription: {
    fontSize: 12,
    color: "#999",
    marginBottom: 10,
  },
  restaurantDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantRating: {
    fontSize: 12,
    color: "#FFD700",
    marginRight: 10,
  },
  restaurantDelivery: {
    fontSize: 12,
    color: "#999",
    marginHorizontal: 10,
  },
  restaurantTime: {
    fontSize: 12,
    color: "#999",
  },
  categoryList: {
    marginBottom: 20,
  },
  restaurantList: {
    marginBottom: 20,
  },
});

export default HomeScreen;
