import { useState } from 'react';
import { Save, Bell, Moon, Sun, Globe, Shield, User, Key, Database, FileText, ToggleLeft, ToggleRight, AlertTriangle } from 'lucide-react';

export default function SystemSettings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('english');
    const [autoBackup, setAutoBackup] = useState(true);
    const [logRetention, setLogRetention] = useState(30);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [activeTab, setActiveTab] = useState('general');
    
    const handleSave = () => {
        // Simulate saving settings
        alert('Settings saved successfully!');
    };
  
    return (
        <div className="bg-gray-50 min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">System Settings</h1>
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Save size={18} />
                        Save Settings
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                            <nav>
                                <ul className="space-y-1">
                                    <li>
                                        <button 
                                        onClick={() => setActiveTab('general')}
                                        className={`w-full text-left flex items-center gap-2 p-3 rounded-md transition-colors ${activeTab === 'general' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                        <Globe size={18} />
                                        <span>General</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        onClick={() => setActiveTab('security')}
                                        className={`w-full text-left flex items-center gap-2 p-3 rounded-md transition-colors ${activeTab === 'security' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                        <Shield size={18} />
                                        <span>Security</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        onClick={() => setActiveTab('users')}
                                        className={`w-full text-left flex items-center gap-2 p-3 rounded-md transition-colors ${activeTab === 'users' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                        <User size={18} />
                                        <span>Users</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        onClick={() => setActiveTab('database')}
                                        className={`w-full text-left flex items-center gap-2 p-3 rounded-md transition-colors ${activeTab === 'database' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                        <Database size={18} />
                                        <span>Database</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                        onClick={() => setActiveTab('logs')}
                                        className={`w-full text-left flex items-center gap-2 p-3 rounded-md transition-colors ${activeTab === 'logs' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        >
                                        <FileText size={18} />
                                        <span>Logs</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                
                    <div className="md:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            {activeTab === 'general' && (
                                <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">General Settings</h2>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                    <h3 className="font-medium">Dark Mode</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable dark mode for system interface</p>
                                    </div>
                                    <button 
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                    {darkMode ? <Moon size={24} /> : <Sun size={24} />}
                                    </button>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                    <h3 className="font-medium">Notifications</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Enable system notifications</p>
                                    </div>
                                    <button 
                                    onClick={() => setNotifications(!notifications)}
                                    className={`text-gray-500 dark:text-gray-400 ${notifications ? 'text-blue-600 dark:text-blue-400' : ''}`}
                                    >
                                    {notifications ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                    </button>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">System Language</h3>
                                    <select 
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                    >
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                    <option value="german">German</option>
                                    <option value="vietnamese">Vietnamese</option>
                                    </select>
                                </div>
                                </div>
                            )}
                        
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Security Settings</h2>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                    <h3 className="font-medium">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for all admin users</p>
                                    </div>
                                    <button 
                                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                                    className={`text-gray-500 dark:text-gray-400 ${twoFactorAuth ? 'text-blue-600 dark:text-blue-400' : ''}`}
                                    >
                                    {twoFactorAuth ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                    </button>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Password Policy</h3>
                                    <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="uppercase" className="rounded" defaultChecked />
                                        <label htmlFor="uppercase">Require uppercase letters</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="numbers" className="rounded" defaultChecked />
                                        <label htmlFor="numbers">Require numbers</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="special" className="rounded" defaultChecked />
                                        <label htmlFor="special">Require special characters</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="length" className="rounded" defaultChecked />
                                        <label htmlFor="length">Minimum 8 characters</label>
                                    </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Session Timeout (minutes)</h3>
                                    <input 
                                    type="number" 
                                    min="5" 
                                    max="120" 
                                    defaultValue="30"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                                    />
                                </div>
                                </div>
                            )}
                        
                            {activeTab === 'database' && (
                                <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Database Settings</h2>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                    <h3 className="font-medium">Automatic Backup</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Schedule daily database backups</p>
                                    </div>
                                    <button 
                                    onClick={() => setAutoBackup(!autoBackup)}
                                    className={`text-gray-500 dark:text-gray-400 ${autoBackup ? 'text-blue-600 dark:text-blue-400' : ''}`}
                                    >
                                    {autoBackup ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                    </button>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Backup Time</h3>
                                    <input 
                                    type="time" 
                                    defaultValue="03:00"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                                    />
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Backup Retention (days)</h3>
                                    <input 
                                    type="number" 
                                    min="1" 
                                    max="365" 
                                    defaultValue="14"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                                    />
                                </div>
                                
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex gap-3">
                                    <AlertTriangle className="text-yellow-500 shrink-0" />
                                    <p className="text-yellow-700 dark:text-yellow-300">Changing database settings may affect system performance. Make sure to test any changes in a staging environment first.</p>
                                    </div>
                                </div>
                                </div>
                            )}
                        
                            {activeTab === 'logs' && (
                                <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">Log Settings</h2>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Log Level</h3>
                                    <select 
                                    defaultValue="info"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                    >
                                    <option value="error">Error Only</option>
                                    <option value="warning">Warning & Error</option>
                                    <option value="info">Info & Above</option>
                                    <option value="debug">Debug (Verbose)</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Log Retention Period (days)</h3>
                                    <input 
                                    type="number" 
                                    min="7" 
                                    max="365" 
                                    value={logRetention}
                                    onChange={(e) => setLogRetention(parseInt(e.target.value))}
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                                    />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-medium">Log Categories</h3>
                                    <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="auth-logs" className="rounded" defaultChecked />
                                        <label htmlFor="auth-logs">Authentication</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="user-logs" className="rounded" defaultChecked />
                                        <label htmlFor="user-logs">User Actions</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="system-logs" className="rounded" defaultChecked />
                                        <label htmlFor="system-logs">System Operations</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="api-logs" className="rounded" defaultChecked />
                                        <label htmlFor="api-logs">API Requests</label>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            )}
                        
                            {activeTab === 'users' && (
                                <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2">User Management Settings</h2>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Default User Role</h3>
                                    <select 
                                    defaultValue="editor"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                    >
                                    <option value="viewer">Viewer</option>
                                    <option value="editor">Editor</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Administrator</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div>
                                    <h3 className="font-medium">Allow Self-Registration</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Let users create their own accounts</p>
                                    </div>
                                    <button className="text-gray-500 dark:text-gray-400">
                                    <ToggleLeft size={24} />
                                    </button>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Account Approval</h3>
                                    <select 
                                    defaultValue="manual"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                    >
                                    <option value="auto">Automatic (Immediate)</option>
                                    <option value="email">Email Verification Required</option>
                                    <option value="manual">Manual Admin Approval</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <h3 className="font-medium mb-2">Inactive Account Handling</h3>
                                    <select 
                                    defaultValue="notify"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                    >
                                    <option value="none">Do Nothing</option>
                                    <option value="notify">Notify Admin</option>
                                    <option value="disable">Disable After 90 Days</option>
                                    <option value="delete">Delete After 180 Days</option>
                                    </select>
                                </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}