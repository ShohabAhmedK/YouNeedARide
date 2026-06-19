# CLAUDE.md — You Need A Ride (Project Knowledge File)

> This file contains the complete project context for the **You Need A Ride** ride-hailing platform.
> Claude Code will automatically read this file in every session.
> Last Updated: June 2026

---

## 1. PROJECT OVERVIEW

**Project Name:** You Need A Ride  
**Type:** Ride-Hailing Mobile Application  
**Similar To:** Uber / Lyft  
**Key Differentiator:** Driver-friendly commission structure + loyalty-based rewards for both riders and drivers  
**Document Version:** FSD v1.0 by HBOX  

---

## 2. SYSTEM COMPONENTS

The platform has **3 main components:**

| Component | Type | Users |
|---|---|---|
| Rider Mobile App | Mobile (iOS + Android) | Customers/Riders |
| Driver Mobile App | Mobile (iOS + Android) | Drivers |
| Admin Web Panel | Web (Browser) | Administrators |

---

## 3. USER ROLES

### 3.1 Rider / Customer
- Books rides via mobile app
- Pays via credit/debit card
- Earns loyalty discounts

### 3.2 Driver
- Registers with documents
- Gets verified by admin before going live
- Accepts rides, earns money minus platform commission
- Earns milestone rewards

### 3.3 Administrator
- Manages entire platform via web panel
- Approves/rejects drivers
- Configures pricing, commissions, loyalty rules
- Views reports and analytics

---

## 4. RIDER APP — FEATURES & SPECS

### 4.1 Registration
**Required Fields:**
- Full Name
- Email Address (must be unique)
- Phone Number
- Password + Confirm Password (must match, show/hide toggle)

**Flow:** Register → Email Verification → Login → Map Screen

### 4.2 Login
- Email + Password
- Google Login (shown in UI)
- Facebook Login (shown in UI)
- On success → redirect to Main Map Screen

### 4.3 Forgot Password
- Enter registered email → receive reset link → set new password → old password invalidated

### 4.4 Main Map Screen
**Displays:**
- Rider's current location (GPS)
- Nearby available drivers on map
- Destination search field
- Pickup location option
- Sidebar/menu access
- Reward Points progress bar

**Location Permission:**
- App requests GPS permission
- If denied → manual pickup entry allowed
- Live location required for driver matching

### 4.5 Set Pickup Location
- Auto GPS detection
- Manual address entry
- Map pin drag adjustment
- Pickup notes (gate code, landmark, building)

### 4.6 Set Destination
- Search by address or place name
- Saved locations (Home, Work)
- Route calculation
- Estimated distance + duration

### 4.7 Fare Calculation (shown BEFORE ride confirmation)
**Fare Components:**
- Base Fare
- Distance Rate (per mile)
- Platform Fee
- Estimated Total Fare
- Estimated Trip Duration

> Final fare may be recalculated after ride based on actual distance/waiting time.

### 4.8 Request Ride Flow
1. Rider reviews pickup + destination + fare
2. Taps "Request Ride"
3. System searches nearby drivers
4. Status → "Finding Driver"
5. Nearby drivers receive notification

### 4.9 Driver Matching
- Match based on proximity + availability
- Driver has limited time to accept/decline
- If no response → request moves to next driver

**Driver Info Shown to Rider After Match:**
- Driver name
- Driver photo
- Vehicle make/model
- Vehicle color
- License plate number
- Driver rating
- Estimated arrival time (ETA)

### 4.10 Real-Time Driver Tracking
- Map shows driver movement toward pickup
- ETA updates dynamically
- Route/path visualization

**Ride Status Updates:**
1. Driver Assigned
2. Driver Arriving
3. Driver Arrived
4. Ride Started
5. Ride Completed

### 4.11 In-App Communication (after ride accepted)
- Direct Call option
- In-App Chat option
- Use: pickup coordination, gate details, landmark clarification

### 4.12 Ride Start
- Status → "In Progress"
- Rider views route progress
- System tracks live movement
- Trip distance + duration recorded

### 4.13 Ride Completion
- Status → "Completed"
- Final fare calculated
- Payment processed automatically
- Digital receipt generated (in-app + email)
- Rider prompted to rate driver

### 4.14 Payment Processing
**Supported Methods:**
- Credit Cards
- Debit Cards
- Cash (shown in UI — to be confirmed in spec)

**Rules:**
- Multiple payment methods allowed
- Default payment method selectable
- Payment charged after ride completion
- Failed payment → retry or alternate method flow

### 4.15 Rating & Review
- 1 to 5 star rating
- Optional written feedback
- Stored against ride + driver profile
- Admin can review from web panel

### 4.16 Rider Loyalty Program
| Milestone | Reward |
|---|---|
| 50 rides completed | 50% discount on next ride |
| 100 rides completed | Cycle resets |

- Minimum fare floor may apply on discounted rides
- Loyalty progress visible to rider
- Admin can manage loyalty rules

### 4.17 Ride History
**Per Ride Shows:**
- Date & Time
- Pickup + Destination
- Driver Details
- Fare Breakdown
- Payment Status
- Receipt Access

### 4.19 My Account
Rider can manage:
- Personal profile
- Profile photo
- Phone number
- Password
- Payment methods
- Saved locations (Home, Work)

### 4.20 Notifications
**Types:** Ride confirmation, Driver assigned, Driver arriving, Driver arrived, Ride started, Ride completed, Payment receipt  
**Channels:** Push Notification + Email

### 4.21 Customer Support
- Help Center / FAQs
- Report Issue / Feedback (optional)

### 4.22 Static Content Pages
- Terms of Service
- Privacy Policy
- Safety Guidelines
- About Us
- Contact Us

---

## 5. DRIVER APP — FEATURES & SPECS

### 5.1 Driver Registration
**Required Fields:**
- Full Name
- Email Address
- Phone Number
- Password
- Driver's License Details
- Driver's License Photo (upload)
- Vehicle Make, Model, Year, Color
- License Plate Number
- Vehicle Registration Document (upload)
- Insurance Document (upload)
- Bank/Payout Information (if required during onboarding)

### 5.2 Vehicle Eligibility Check
- Vehicle must be **2012 or newer**
- Older vehicles → registration blocked/rejected
- Admin may review before final approval

### 5.3 Driver Verification Process
**Status after registration:** PENDING

**Admin verifies:**
- Driver identity
- Driver's license
- Vehicle registration
- Insurance documents
- Vehicle eligibility
- Background check status

**Outcomes:**
- Approved → can go online and accept rides
- Rejected → reason shared with driver

### 5.4 Driver Login
- Pending/Rejected drivers cannot accept rides
- System shows account status if access is limited
- Approved drivers → redirect to Driver Dashboard

### 5.5 Driver Dashboard
**Shows:**
- Online/Offline toggle
- Today's earnings
- Completed rides count
- Pending payouts
- Active ride information
- Loyalty/milestone progress
- Ratings summary

### 5.6 Availability Management
- Driver can toggle Online / Offline
- Only Online + Approved drivers receive ride requests
- Live location shared while Online

### 5.7 Incoming Ride Requests
**Request Shows:**
- Pickup location
- Pickup distance
- Destination zone/location
- Estimated fare
- Time limit to respond

**Driver Can:** Accept or Decline  
If no response → request moves to next driver

### 5.8 Navigation
- Open route in Google Maps
- In-app route display (optional)
- Navigate: Pickup first → then Destination

### 5.9 Driver-Rider Communication
- Call Rider
- In-App Chat with Rider
- Available only during active ride lifecycle

### 5.10 Ride Workflow (Status Flow)
1. Ride Request Received
2. Ride Accepted
3. Driver En Route to Pickup
4. Driver Arrived
5. Ride Started
6. Ride Completed
7. Fare Processed
8. Earnings Updated

### 5.11 Driver Earnings
- Earnings = Final Fare - Platform Commission
- Added to driver wallet/account balance
- View: Daily / Weekly / Total earnings
- Commission % configurable from Admin Panel

### 5.12 Driver Loyalty / Milestone Rewards
| Milestone | Reward |
|---|---|
| Every 100 rides | Milestone reward (value set by admin) |

- Counter resets after reward claim
- Driver can view reward progress + history
- Admin manages threshold + reward value

### 5.13 Earnings & Ride History
**Per Ride Shows:**
- Date & Time
- Pickup + Destination
- Fare Amount
- Platform Commission
- Driver Earning
- Payment Status
- Rider Rating
- Milestone Reward History
- Payout Status

### 5.14 Driver Profile Management
Driver can manage:
- Personal details
- Profile photo
- Vehicle details
- Uploaded documents
- Bank/payout information
- Password
- Notification preferences

### 5.15 Document Expiry Alerts
- Driver notified before insurance/registration expiry
- Admin sees expired/soon-to-expire documents
- Driver may be restricted from going online if docs expire

### 5.16 Driver Support
- Help Center / FAQs
- Report rider or ride issue

---

## 6. ADMIN WEB PANEL — FEATURES & SPECS

### 6.1 Admin Login
- Email + Password
- Role-based access (if multiple admin types needed)
- Secure session management

### 6.2 Admin Dashboard KPIs
- Total Riders
- Total Drivers
- Pending Driver Approvals
- Active Rides
- Completed Rides
- Cancelled Rides
- Total Revenue
- Platform Commission
- Driver Payouts
- User Growth
- Ride Volume Trends

### 6.3 Driver Management
Admin can:
- View, search, filter driver list
- View driver profile + uploaded documents
- Approve / Reject (with reason) / Suspend / Reactivate driver
- View driver ride history, ratings, earnings, payouts

### 6.4 Customer Management
Admin can:
- View, search, filter customer list
- View customer profile + ride history + payment history
- Suspend / Reactivate customer account
- Review reported issues

### 6.5 Ride Management
Admin can view:
- Completed + Cancelled rides
- Ride details (pickup, destination, driver, rider, payment status)

### 6.6 Finance & Commission Management
Admin views:
- Total fare collected
- Platform commission
- Driver earnings
- Pending + Completed + Failed payouts

### 6.7 Pricing Management (Configurable without app release)
| Setting | Description |
|---|---|
| Base Fare | Fixed starting fare |
| Per-Mile Distance Rate | Rate per mile/km |
| Platform Commission % | Deducted from driver earnings |
| Minimum Fare | Floor price per ride |
| Loyalty Discount Rules | Milestone discount config |

### 6.9 Reports & Analytics
**Report Types:**
- Ride Report
- Revenue Report
- Driver Earning Report
- Driver Approval Report

**Filters:** Date range, Driver, Customer, Ride status, Region  
**Export:** CSV / PDF (if required)

### 6.10 Support Ticket Management
Admin can:
- View reported issues
- Respond to rider via email
- Respond to driver via email

### 6.11 Static Content Management
Admin manages:
- Terms of Service
- Privacy Policy
- Safety Guidelines
- FAQs
- About Us
- Contact Us

---

## 7. NOTIFICATIONS

### Rider Notifications
Registration confirmation, Password reset, Driver assigned, Driver arriving, Ride started, Ride completed, Payment receipt, Loyalty reward earned

### Driver Notifications
Registration submitted, Account approved/rejected, New ride request, Ride cancelled, Payment/earning update, Milestone reward earned, Document expiry alert

### Admin Notifications
New driver registration, Pending document verification, Reported ride issue, Failed payment

**Channels:** Push Notification + Email

---

## 8. RIDE STATUSES (Complete List)

| # | Status |
|---|---|
| 1 | Requested |
| 2 | Searching for Driver |
| 3 | Driver Assigned |
| 4 | Driver En Route |
| 5 | Driver Arrived |
| 6 | Ride Started |
| 7 | Ride Completed |
| 8 | Cancelled by Rider |
| 9 | Cancelled by Driver |
| 10 | Payment Pending |
| 11 | Payment Completed |

---

## 9. CORE BUSINESS RULES

- Only registered riders can request rides
- Only approved drivers can accept rides
- Drivers must be Online to receive requests
- Vehicles older than 2012 are rejected
- Fare must be shown BEFORE ride confirmation
- Platform commission is deducted from driver earnings
- Rider loyalty discount applies after milestone (50 rides)
- Driver reward applies after milestone (100 rides)
- Admin can approve, reject, suspend, reactivate drivers
- Admin can update pricing + loyalty rules anytime
- Completed rides stored in both rider and driver history

---

## 10. PAYMENT & PAYOUT SPECS

### Rider Payments
- Charged after ride completion
- Payment status stored with ride record
- Receipt generated after successful payment

### Driver Earnings
- Calculated after commission deduction
- Visible in driver app
- Admin can view all driver earnings

### Driver Payouts
- Drivers link payment account
- Admin monitors pending + completed payouts
- Exact payout method + schedule → TBD during development

---

## 11. OUT OF SCOPE / TO BE CONFIRMED

These items need client confirmation before development:

- [ ] Final commission percentage
- [ ] Final payment gateway provider
- [ ] Exact driver payout method and frequency
- [ ] Whether cash payments will be supported
- [ ] Cancellation fee rules
- [ ] Refund rules
- [ ] Surge pricing requirement
- [ ] Multi-stop ride requirement
- [ ] Scheduled ride requirement
- [ ] Admin role permissions (granular)
- [ ] Background check provider integration
- [ ] Exact SMS/email provider
- [ ] In-app chat: custom-built or third-party?
- [ ] Reports export in PDF/CSV

---

## 12. DELIVERABLES

1. Rider Mobile App
2. Driver Mobile App
3. Admin Web Panel
4. Backend APIs
5. Database Setup
6. Payment Integration
7. Notification Integration
8. Location and Map Integration
9. Basic Reporting Module
10. Deployment Support
11. Testing and QA Support

---

## 13. UI / USER FLOW NOTES (From Design Screens)

Based on the User Flow PDF, the following UI patterns are confirmed:

- **Onboarding:** 3 splash screens → Rider or Driver selection
- **Auth:** Login, Register, Forgot Password, OTP Verification, Set New Password
- **Map Home:** Shows reward points progress bar at bottom
- **Booking Flow:** Where from? → Where to? → Confirm Address (time/price/distance) → Find Drivers → Finding Drivers → Ride Details → Arrived → Pay
- **Payment Screen:** Cash, Mastercard, Visa options shown
- **Ride Complete:** Shows fare summary + milestone progress (e.g. 73/100 rides)
- **Reward Points:** 3 tabs — Progress, How It Works, History
- **Profile:** Settings menu with Personal Info, Notifications, Payment Methods, Help/Support, Logout
- **Communication:** In-app chat + Calling screen both designed

---

## 14. QUICK REFERENCE FOR DEVELOPMENT

### When building Rider App, remember:
- Show fare BEFORE booking confirmation
- GPS permission → fallback to manual entry
- Loyalty progress always visible on home screen
- Rating prompt appears immediately after ride completion

### When building Driver App, remember:
- New drivers start as PENDING — cannot accept rides
- Vehicle year validation at registration (2012+)
- Document expiry alerts must be implemented
- Earnings = Fare - Commission (commission % from admin config)

### When building Admin Panel, remember:
- Pricing changes apply to FUTURE rides only
- Admin can update content without app release
- Driver approval workflow: Pending → Approved/Rejected
- Commission % must be configurable field

---

*End of CLAUDE.md — You Need A Ride Project*