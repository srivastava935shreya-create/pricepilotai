import { useEffect, useState } from "react";
import { apiRequest, predictDemand } from "./api";

function Dashboard({ user, onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardError, setDashboardError] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    product_name: "",
    category: "",
    region: "",
    current_price: "",
    competitor_price: "",
    stock_availability: "",
  });

  const [productFormError, setProductFormError] = useState("");
  const [productFormLoading, setProductFormLoading] = useState(false);
  useEffect(() => {
    apiRequest("/dashboard")
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => {
        setDashboardError(error.message);
      });
  }, []);
  useEffect(() => {
    if (activePage !== "Products") {
      return;
    }

    setProductsLoading(true);
    setProductsError("");

    apiRequest("/products")
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        setProductsError(error.message);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, [activePage]);

  const menuItems = [
    "Dashboard",
    "Products",
    "Pricing",
    "Forecast",
    "Competitor",
    "Reports",
    "AI Assistant",
    "Settings",
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          padding: "24px",
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>PricePilot AI</h2>

        <div style={{ marginTop: "30px" }}>
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px",
                marginBottom: "8px",
                textAlign: "left",
                border: "none",
                background: activePage === item ? "#eee" : "transparent",
                cursor: "pointer",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "40px" }}>
          <p>{user.username}</p>
          <p>{user.role}</p>

          <button onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px" }}>
        <h1>{activePage}</h1>

        {activePage === "Dashboard" && (
          <div>
            <p>Welcome to your PricePilot AI workspace.</p>
            {dashboardError && (
              <p style={{ color: "red" }}>
                {dashboardError}</p>
            )}
            {!dashboardData && !dashboardError && (
              <p>Loading dashboard data...</p>
            )}
            {dashboardData && (
              <div>
                <h2>Business Overview</h2>
                <p>Total Revenue: ₹{dashboardData.total_revenue.toLocaleString()}</p>
                <p>Total Demand: {dashboardData.total_demand.toLocaleString()} units</p>
                <p>Average Revenue per Unit: ₹{dashboardData.average_revenue_per_unit}</p>
                <p>Highest Revenue Category:{" "}{dashboardData.highest_revenue_category}</p>
                <p>Highest Revenue Region:{" "}{dashboardData.highest_revenue_region}</p>
                <p>Highest Revenue Channel:{" "}{dashboardData.highest_revenue_channel}</p>
                <h2>Pricing Strategy</h2>
                <p>Maintain Competitive Range:{" "}{dashboardData.pricing_strategy.maintain_competitive_range}</p>
                <p>Review Price Competitiveness:{" "}{dashboardData.pricing_strategy.review_price_competitiveness}</p>
                <p>Evaluate Price Increase:{" "}{dashboardData.pricing_strategy.evaluate_price_increase}</p>
              </div>
            )}
          </div>
        )}

        {activePage === "Pricing" && (
          <div>
            <h2>Pricing Intelligence</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.target);

                const data = {
                  Category: formData.get("Category"),
                  Region: formData.get("Region"),
                  Sales_Channel: formData.get("Sales_Channel"),
                  Season: formData.get("Season"),
                  Price_Position: formData.get("Price_Position"),

                  Price: Number(formData.get("Price")),
                  Discount_Percentage: Number(formData.get("Discount_Percentage")),
                  Marketing_Spend: Number(formData.get("Marketing_Spend")),
                  Website_Visits: Number(formData.get("Website_Visits")),
                  Search_Interest: Number(formData.get("Search_Interest")),
                  Competitor_Price: Number(formData.get("Competitor_Price")),
                  Stock_Availability: Number(formData.get("Stock_Availability")),
                  Customer_Rating: Number(formData.get("Customer_Rating")),
                  Return_Rate: Number(formData.get("Return_Rate")),
                  Holiday_Flag: Number(formData.get("Holiday_Flag")),
                  Promotion_Flag: Number(formData.get("Promotion_Flag")),
                  New_Product_Flag: Number(formData.get("New_Product_Flag")),
                  Delivery_Days: Number(formData.get("Delivery_Days")),
                  Month: Number(formData.get("Month")),
                };

                try {
                  const result = await predictDemand(data);
                  setPrediction(result.prediction);
                } catch (error) {
                  alert(error.message);
                }
              }}
            >
              <select name="Category" required defaultValue="">
                <option value="" disabled>Category</option>
                <option value="Beauty">Beauty</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Grocery">Grocery</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
              </select>

              <select name="Region" required defaultValue="">
                <option value="" disabled>Region</option>
                <option value="Central">Central</option>
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="West">West</option>
              </select>

              <select name="Sales_Channel" required defaultValue="">
                <option value="" disabled>Sales Channel</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Website">Website</option>
              </select>

              <select name="Season" required defaultValue="">
                <option value="" disabled>Season</option>
                <option value="Autumn">Autumn</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
              </select>

              <select name="Price_Position" required defaultValue="">
                <option value="" disabled>Price Position</option>
                <option value="Cheaper">Cheaper</option>
                <option value="More Expensive">More Expensive</option>
              </select>

              <input
                name="Price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Price"
                required
              />
              <input
                name="Discount_Percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Discount Percentage"
                required
              />
              <input
                name="Marketing_Spend"
                type="number"
                step="0.01"
                min="0"
                placeholder="Marketing Spend"
                required
              />
              <input
                name="Website_Visits"
                type="number"
                step="1"
                min="0"
                placeholder="Website Visits"
                required
              />
              <input
                name="Search_Interest"
                type="number"
                step="0.01"
                min="0"
                placeholder="Search Interest"
                required
              />
              <input
                name="Competitor_Price"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Competitor Price"
                required
              />
              <input
                name="Stock_Availability"
                type="number"
                step="1"
                min="0"
                placeholder="Stock Availability"
                required
              />
              <input
                name="Customer_Rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Customer Rating (0-5)"
                required
              />
              <input
                name="Return_Rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="Return Rate (%)"
                required
              />

              <input
                name="Holiday_Flag"
                type="number"
                min="0"
                max="1"
                step="1"
                placeholder="Holiday Flag (0/1)"
                required
              />
              <input
                name="Promotion_Flag"
                type="number"
                min="0"
                max="1"
                step="1"
                placeholder="Promotion Flag (0/1)"
                required
              />
              <input
                name="New_Product_Flag"
                type="number"
                min="0"
                max="1"
                step="1"
                placeholder="New Product Flag (0/1)"
                required
              />

              <input
                name="Delivery_Days"
                type="number"
                step="1"
                min="0"
                placeholder="Delivery Days"
                required
              />
              <input
                name="Month"
                type="number"
                min="1"
                max="12"
                step="1"
                placeholder="Month (1-12)"
                required
              />

              <button type="submit">
                Predict Demand
              </button>
            </form>
            {prediction !== null && (
              <div><h3>Predicted Demand</h3>
                <p>{prediction.toFixed(2)} units</p>
              </div>
            )}
          </div>
        )}

        {activePage === "Products" && (
          <div>
            <h2>Products</h2>

            {productsLoading && <p>Loading products...</p>}
            <div>
              <h3>
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>

              {productFormError && (
                <p style={{ color: "red" }}>
                  {productFormError}
                </p>
              )}

              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  setProductFormError("");
                  setProductFormLoading(true);

                  try {
                    const payload = {
                      product_name: productForm.product_name,
                      category: productForm.category,
                      region: productForm.region,
                      current_price: Number(productForm.current_price),
                      competitor_price: Number(productForm.competitor_price),
                      stock_availability: Number(productForm.stock_availability),
                    };

                    let savedProduct;

                    if (editingProduct) {
                      savedProduct = await apiRequest(
                        `/products/${editingProduct.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(payload),
                        }
                      );
                    } else {
                      savedProduct = await apiRequest("/products", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                      });
                    }

                    if (editingProduct) {
                      setProducts((currentProducts) =>
                        currentProducts.map((product) =>
                          product.id === savedProduct.id
                            ? savedProduct
                            : product
                        )
                      );
                    } else {
                      setProducts((currentProducts) => [
                        savedProduct,
                        ...currentProducts,
                      ]);
                    }

                    setEditingProduct(null);

                    setProductForm({
                      product_name: "",
                      category: "",
                      region: "",
                      current_price: "",
                      competitor_price: "",
                      stock_availability: "",
                    });
                  } catch (error) {
                    setProductFormError(error.message);
                  } finally {
                    setProductFormLoading(false);
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Product name"
                  value={productForm.product_name}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      product_name: event.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      category: event.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Region"
                  value={productForm.region}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      region: event.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Current price"
                  value={productForm.current_price}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      current_price: event.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Competitor price"
                  value={productForm.competitor_price}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      competitor_price: event.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min="0"
                  placeholder="Stock availability"
                  value={productForm.stock_availability}
                  onChange={(event) =>
                    setProductForm({
                      ...productForm,
                      stock_availability: event.target.value,
                    })
                  }
                  required
                />

                <button type="submit" disabled={productFormLoading}>
                  {productFormLoading
                    ? "Saving..."
                    : editingProduct
                      ? "Update Product"
                      : "Add Product"}
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({
                        product_name: "",
                        category: "",
                        region: "",
                        current_price: "",
                        competitor_price: "",
                        stock_availability: "",
                      });
                      setProductFormError("");
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>

            {productsError && (
              <p style={{ color: "red" }}>
                {productsError}
              </p>
            )}

            {!productsLoading && !productsError && products.length === 0 && (
              <p>No products found.</p>
            )}

            {!productsLoading && products.length > 0 && (
              <div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "15px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <h3>{product.product_name}</h3>

                    <p>
                      <strong>Category:</strong> {product.category}
                    </p>

                    <p>
                      <strong>Region:</strong> {product.region}
                    </p>

                    <p>
                      <strong>Current Price:</strong> ₹{product.current_price}
                    </p>

                    <p>
                      <strong>Competitor Price:</strong> ₹{product.competitor_price}
                    </p>

                    <p>
                      <strong>Stock:</strong> {product.stock_availability}
                    </p>

                    <button
                      onClick={() => {
                        setEditingProduct(product);

                        setProductForm({
                          product_name: product.product_name,
                          category: product.category,
                          region: product.region,
                          current_price: product.current_price,
                          competitor_price: product.competitor_price,
                          stock_availability: product.stock_availability,
                        });

                        setProductFormError("");
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        const confirmed = window.confirm(
                          `Delete ${product.product_name}?`
                        );

                        if (!confirmed) {
                          return;
                        }

                        try {
                          await apiRequest(`/products/${product.id}`, {
                            method: "DELETE",
                          });

                          setProducts((currentProducts) =>
                            currentProducts.filter(
                              (item) => item.id !== product.id
                            )
                          );
                        } catch (error) {
                          setProductsError(error.message);
                        }
                      }}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* FORECAST */}
        {activePage === "Forecast" && (
          <div>
            <h2>Demand Forecast</h2>

            <p>
              Demand forecasting and revenue intelligence based on
              available product and pricing data.
            </p>

            {products.length === 0 ? (
              <p>No product data available for forecasting.</p>
            ) : (
              <div>
                <h3>Current Product Forecast View</h3>

                {products.map((product) => {
                  const priceDifference =
                    product.current_price - product.competitor_price;

                  let demandStatus = "Stable";

                  if (priceDifference < -5) {
                    demandStatus = "High Demand Potential";
                  } else if (priceDifference > 5) {
                    demandStatus = "Demand Risk";
                  }

                  return (
                    <div
                      key={product.id}
                      style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <h3>{product.product_name}</h3>

                      <p>
                        Current Price: ₹{product.current_price}
                      </p>

                      <p>
                        Competitor Price: ₹{product.competitor_price}
                      </p>

                      <p>
                        Price Difference: ₹{priceDifference.toFixed(2)}
                      </p>

                      <strong>{demandStatus}</strong>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* COMPETITOR */}
        {activePage === "Competitor" && (
          <div>
            <h2>Competitor Analysis</h2>

            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              <div>
                {products.map((product) => {
                  const difference =
                    product.current_price - product.competitor_price;

                  const percentageDifference =
                    product.competitor_price !== 0
                      ? (difference / product.competitor_price) * 100
                      : 0;

                  let position = "At Competitor Price";

                  if (difference < 0) {
                    position = "Below Competitor";
                  } else if (difference > 0) {
                    position = "Above Competitor";
                  }

                  return (
                    <div
                      key={product.id}
                      style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                      }}
                    >
                      <h3>{product.product_name}</h3>

                      <p>
                        Our Price: ₹{product.current_price}
                      </p>

                      <p>
                        Competitor Price: ₹{product.competitor_price}
                      </p>

                      <p>
                        Difference: ₹{difference.toFixed(2)}
                      </p>

                      <p>
                        Difference %: {percentageDifference.toFixed(2)}%
                      </p>

                      <strong>{position}</strong>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* REPORTS */}
        {activePage === "Reports" && (
          <div>
            <h2>Reports</h2>

            <p>Pricing Intelligence Summary</p>

            <div>
              <h3>Total Products</h3>
              <p>{products.length}</p>
            </div>

            <div>
              <h3>Total Stock</h3>
              <p>
                {products
                  .reduce(
                    (total, product) =>
                      total + Number(product.stock_availability),
                    0
                  )
                  .toFixed(0)}
              </p>
            </div>

            <div>
              <h3>Average Current Price</h3>
              <p>
                ₹
                {products.length > 0
                  ? (
                    products.reduce(
                      (total, product) =>
                        total + Number(product.current_price),
                      0
                    ) / products.length
                  ).toFixed(2)
                  : "0.00"}
              </p>
            </div>

            <div>
              <h3>Average Competitor Price</h3>
              <p>
                ₹
                {products.length > 0
                  ? (
                    products.reduce(
                      (total, product) =>
                        total + Number(product.competitor_price),
                      0
                    ) / products.length
                  ).toFixed(2)
                  : "0.00"}
              </p>
            </div>

            <h3>Product Summary</h3>

            {products.map((product) => (
              <div key={product.id}>
                <p>
                  <strong>{product.product_name}</strong> — ₹
                  {product.current_price} vs ₹
                  {product.competitor_price}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* AI ASSISTANT */}
        {activePage === "AI Assistant" && (
          <div>
            <h2>AI Pricing Assistant</h2>

            <p>
              Ask for a quick pricing insight based on the products
              currently available in PricePilot AI.
            </p>

            <button
              onClick={() => {
                if (products.length === 0) {
                  alert("No product data available.");
                  return;
                }

                const belowCompetitor = products.filter(
                  (product) =>
                    Number(product.current_price) <
                    Number(product.competitor_price)
                );

                const aboveCompetitor = products.filter(
                  (product) =>
                    Number(product.current_price) >
                    Number(product.competitor_price)
                );

                let message =
                  `PricePilot AI analyzed ${products.length} product(s).\n\n`;

                message +=
                  `${belowCompetitor.length} product(s) are priced below competitors.\n`;

                message +=
                  `${aboveCompetitor.length} product(s) are priced above competitors.\n\n`;

                if (belowCompetitor.length > 0) {
                  message +=
                    "These products may have a competitive pricing position.";
                } else {
                  message +=
                    "Review competitor prices before making pricing decisions.";
                }

                alert(message);
              }}
            >
              Analyze Pricing
            </button>
          </div>
        )}

        {/* SETTINGS */}
        {activePage === "Settings" && (
          <div>
            <h2>Settings</h2>

            <p>
              Account: {user?.username}
            </p>

            <p>
              Role: {user?.role}
            </p>

            <p>
              PricePilot AI backend: Connected
            </p>

            <p>
              Authentication: JWT enabled
            </p>

            <p>
              Database: PostgreSQL
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;