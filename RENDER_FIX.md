# 🔧 Render Deployment Fix - Path Error

## Error Message
```
Error: Cannot find module '/opt/render/project/src/server/server/index.js'
```

## Problem
Render is looking for the server file in the wrong path. This happens when the Root Directory and Start Command are misconfigured.

## ✅ Solution

### Option 1: Root Directory = `server` (Recommended)

**Backend Service Configuration:**
```
Root Directory: server
Build Command: npm install
Start Command: npm start
```

**Why this works:**
- Root Directory `server` means Render's working directory is `/opt/render/project/src/server`
- `npm start` runs the script from `server/package.json`: `node index.js`
- This correctly resolves to `/opt/render/project/src/server/index.js` ✅

### Option 2: Root Directory = Empty (Root)

**Backend Service Configuration:**
```
Root Directory: (leave empty)
Build Command: npm install --prefix server
Start Command: npm start
```

**Why this works:**
- Root Directory empty means working directory is `/opt/render/project/src`
- Root `package.json` has: `"start": "node server/index.js"`
- This correctly resolves to `/opt/render/project/src/server/index.js` ✅

## ❌ Common Mistakes

### Wrong Configuration 1:
```
Root Directory: server
Start Command: node server/index.js  ❌ WRONG!
```
**Error**: Looks for `/opt/render/project/src/server/server/index.js` (doesn't exist!)

### Wrong Configuration 2:
```
Root Directory: (empty)
Start Command: node index.js  ❌ WRONG!
```
**Error**: Looks for `/opt/render/project/src/index.js` (doesn't exist!)

## 🔍 How to Fix in Render Dashboard

1. **Go to your Backend Service** in Render Dashboard
2. **Click on "Settings"** tab
3. **Check "Root Directory"**:
   - Should be: `server` (if using Option 1)
   - OR: empty/blank (if using Option 2)
4. **Check "Start Command"**:
   - Should be: `npm start` (for both options)
5. **Save Changes** - Render will automatically redeploy

## 📝 Quick Reference

### For Separate Frontend/Backend Deployment:

**Backend:**
```
Root Directory: server
Build Command: npm install
Start Command: npm start
```

**Frontend:**
```
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
```

### For Monolith Deployment (Single Service):

```
Root Directory: (empty)
Build Command: npm run render-build
Start Command: npm start
Environment Variable: SERVE_STATIC=true
```

## ✅ Verification

After fixing, check the deployment logs. You should see:
```
Server running in production mode on port 10000
Server is explicitly bound to 0.0.0.0
MongoDB Connected: ...
```

If you see this, your configuration is correct! ✅

## 🆘 Still Having Issues?

1. **Check Build Logs**: Look for where npm install runs
2. **Check Runtime Logs**: Look for the exact path error
3. **Verify File Structure**: Ensure `server/index.js` exists in your repo
4. **Check Root Directory**: Make sure it matches your file structure

## 📞 Common Questions

**Q: Should I use Root Directory = `server` or empty?**
A: Use `server` for separate deployments. It's cleaner and more explicit.

**Q: What if my Start Command is different?**
A: Always use `npm start` - it will run the correct script from the appropriate package.json.

**Q: Can I use `node index.js` directly?**
A: Only if Root Directory is `server`. But `npm start` is recommended for consistency.

