// ./test-db.js
const Item = require("./models/itemModel");

(async () => {
    try {
        console.log("🔍 Fetching all items...");
        const items = await Item.getAllItems();
        console.log("✅ Items:", items);

        console.log("\n🔍 Fetching item by ID (1)...");
        const item = await Item.getItemByID(1);
        console.log("✅ Item 1:", item);
    } catch (err) {
        console.error("❌ Error during DB test:", err.message);
    }
})();
