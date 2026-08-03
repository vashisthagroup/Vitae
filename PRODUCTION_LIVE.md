# 🚀 VITAE PRODUCTION - GO LIVE NOW

**Everything you need to deploy Vitae at vashisthagroup.net/Vitae**

---

## ✅ WHAT'S ALREADY DONE

- ✅ Vitae app built and tested
- ✅ Deployed to Vercel: https://vitae-sigma-nine.vercel.app
- ✅ VCG website updated to link to subdirectory
- ✅ GitHub repo synced with all code
- ✅ All configuration files created and tested

**Status: READY TO GO LIVE** 🎯

---

## 🎯 WHAT YOU NEED TO DO

### YOUR SERVER SETUP

You need to configure **ONE THING**: Nginx reverse proxy at vashisthagroup.net

---

## 🚀 DEPLOY TO YOUR SERVER - 5 MINUTES

### **Step 1: SSH into your server**

```bash
ssh user@your-server.com
cd /home/your-user/
```

---

### **Step 2: Copy the setup script from GitHub**

```bash
# Download the Nginx setup script
curl -O https://raw.githubusercontent.com/vashisthagroup/Vitae/main/vitae-setup.sh

# Or if using git:
git clone git@github.com:vashisthagroup/Vitae.git
cd Vitae
```

---

### **Step 3: Run the setup script**

```bash
sudo bash vitae-setup.sh
```

**That's it!** The script does everything:
- ✅ Installs Nginx (if needed)
- ✅ Backs up your config
- ✅ Creates Vitae reverse proxy
- ✅ Tests the config
- ✅ Restarts Nginx
- ✅ Verifies it works

---

### **Step 4: Test it works**

```bash
# Test the endpoint
curl -I https://www.vashisthagroup.net/Vitae/

# Should return 200 OK
```

---

### **Step 5: Visit in browser**

```
https://www.vashisthagroup.net/Vitae/
```

You should see: **Vitae home page with black & white theme** ✅

---

## 🔍 IF SOMETHING GOES WRONG

### Run diagnostics:

```bash
sudo bash vitae-debug.sh
```

This will check:
- Nginx status
- Configuration validity
- Vercel backend connectivity
- DNS resolution
- SSL certificates
- Error logs

Share the output and we'll fix it!

---

## 📋 TROUBLESHOOTING

### **Issue: Nginx config test fails**
```bash
# Restore backup and try again
sudo cp /etc/nginx/conf.d/vitae.conf.backup /etc/nginx/conf.d/vitae.conf
sudo nginx -t
sudo systemctl restart nginx
```

### **Issue: Page still blank**
```bash
# Check Nginx error log
sudo tail -50 /var/log/nginx/error.log

# Check if Vercel backend is up
curl -I https://vitae-sigma-nine.vercel.app

# Restart Nginx
sudo systemctl restart nginx
```

### **Issue: SSL certificate errors**
```bash
# Renew Let's Encrypt certificate
sudo certbot renew --nginx

# Or for new domain:
sudo certbot certonly --nginx -d vashisthagroup.net -d www.vashisthagroup.net
```

### **Issue: 502 Bad Gateway**
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify Vercel backend
curl -v https://vitae-sigma-nine.vercel.app

# Restart everything
sudo systemctl restart nginx
```

---

## 🎯 URLS AFTER SETUP

| Purpose | URL |
|---------|-----|
| Vitae Home | https://www.vashisthagroup.net/Vitae/ |
| Recruiter Login | https://www.vashisthagroup.net/Vitae/login?role=recruiter |
| Candidate Login | https://www.vashisthagroup.net/Vitae/login?role=candidate |
| Admin Panel | https://www.vashisthagroup.net/Vitae/admin/approvals |

---

## 📊 WHAT GETS INSTALLED

```
vashisthagroup.net/Vitae/
    ↓ (Nginx Reverse Proxy)
    ↓
vitae-sigma-nine.vercel.app
    ↓
✅ Recruiter Dashboard
✅ Candidate Portal  
✅ Admin Approvals
✅ AI Screening
✅ Interview Scheduling
```

---

## 🔐 SECURITY

- ✅ HTTPS/SSL automatic
- ✅ No credentials stored in config
- ✅ Backup of original config created
- ✅ Config tested before applying

---

## 📞 REQUIREMENTS

Your server must have:
- ✅ Ubuntu/Debian/CentOS Linux
- ✅ Root/sudo access
- ✅ Port 80 & 443 open
- ✅ SSL certificate (Let's Encrypt or your own)
- ✅ Internet access

---

## 💰 COST

- Nginx: **FREE** (open source)
- Vercel: **FREE** (already deployed)
- SSL: **FREE** (Let's Encrypt)
- Total: **$0**

---

## 📝 SCRIPT FILES

All scripts are in this repo:

- **vitae-setup.sh** - Main installation script (run this!)
- **vitae-debug.sh** - Diagnostics script (run if issues)
- **vitae-nginx.conf** - Nginx configuration reference
- **VITAE_SUBDIRECTORY_SETUP.md** - Detailed manual setup guide

---

## ✨ FINAL CHECKLIST

Before you start:

- [ ] SSH access to your server
- [ ] Sudo/root privileges
- [ ] Domain pointing to your server (DNS configured)
- [ ] SSL certificate for vashisthagroup.net
- [ ] Git clone of this repo (or copy scripts manually)

After deployment:

- [ ] Nginx restarted successfully
- [ ] https://www.vashisthagroup.net/Vitae/ loads
- [ ] Sees Vitae home page (black & white)
- [ ] Can click "Recruiter Login"
- [ ] Can login with recruiter@vitae.com / demo123

---

## 🚀 YOU'RE ALL SET!

**Ready to go live?**

1. SSH into your server
2. Run: `sudo bash vitae-setup.sh`
3. Visit: https://www.vashisthagroup.net/Vitae/
4. 🎉 Done!

---

## 📞 NEED HELP?

If the setup script doesn't work:

1. Run: `sudo bash vitae-debug.sh`
2. Share the output
3. We'll debug together!

---

**Vitae is ready to serve your recruitment needs! 🚀**

Status: **PRODUCTION READY**  
Deployment time: ~5 minutes  
Cost: **$0**  
Maintenance: **Zero**

Go live! 🎯
