const cron = require('node-cron');
const { syncInventory } = require('../services/inventoryService');

cron.schedule('0 0 * * *', async () => { await syncInventory(); }); // Every 1 day
cron.schedule('0 */4 * * *', async () => { await syncInventory(); }); // Every 4 hours
cron.schedule('*/15 * * * *', async () => { await syncInventory(); }); // Every 15 minutes
