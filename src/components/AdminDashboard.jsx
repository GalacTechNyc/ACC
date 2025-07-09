import { useState, useEffect } from 'react'
import { Upload, Music, Image, FileText, Plus, Edit, Trash2, LogOut, Save, X } from 'lucide-react'

function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('upload')
  const [musicItems, setMusicItems] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Load music items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('accMusicItems')
    if (savedItems) {
      setMusicItems(JSON.parse(savedItems))
    }
  }, [])

  // Save music items to localStorage
  const saveMusicItems = (items) => {
    setMusicItems(items)
    localStorage.setItem('accMusicItems', JSON.stringify(items))
  }

  const [newItem, setNewItem] = useState({
    title: '',
    composer: '',
    category: 'Drumline',
    subcategory: '',
    duration: '',
    difficulty: 'Intermediate',
    description: '',
    instrumentation: '',
    tempo: '',
    keySignature: '',
    yearComposed: new Date().getFullYear(),
    tags: '',
    priceStandard: '',
    priceExclusive: '',
    audioFile: null,
    sheetMusicFile: null,
    imageFile: null
  })

  const categories = [
    'Drumline',
    'Full Band',
    'Media/Gaming',
    'Media/Film',
    'Warmups',
    'Beats'
  ]

  const difficulties = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Professional',
    'All Levels'
  ]

  const handleFileUpload = (file, type) => {
    if (!file) return null
    
    // Create a URL for the file (in a real app, you'd upload to a server)
    const fileUrl = URL.createObjectURL(file)
    return {
      name: file.name,
      url: fileUrl,
      size: file.size,
      type: file.type
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      // Process file uploads
      const audioData = newItem.audioFile ? handleFileUpload(newItem.audioFile, 'audio') : null
      const sheetMusicData = newItem.sheetMusicFile ? handleFileUpload(newItem.sheetMusicFile, 'pdf') : null
      const imageData = newItem.imageFile ? handleFileUpload(newItem.imageFile, 'image') : null

      const musicItem = {
        id: editingItem ? editingItem.id : `acc_${Date.now()}`,
        title: newItem.title,
        composer: newItem.composer,
        category: newItem.category,
        subcategory: newItem.subcategory,
        duration: newItem.duration,
        difficulty: newItem.difficulty,
        description: newItem.description,
        instrumentation: newItem.instrumentation.split(',').map(i => i.trim()).filter(i => i),
        tempo: newItem.tempo,
        keySignature: newItem.keySignature,
        yearComposed: parseInt(newItem.yearComposed),
        tags: newItem.tags.split(',').map(t => t.trim()).filter(t => t),
        price: {
          standard: parseInt(newItem.priceStandard) || 0,
          exclusive: parseInt(newItem.priceExclusive) || 0
        },
        audioPreview: audioData?.url || '',
        sheetMusic: sheetMusicData?.url || '',
        coverImage: imageData?.url || '',
        files: {
          audio: audioData,
          sheetMusic: sheetMusicData,
          image: imageData
        },
        uploadDate: editingItem ? editingItem.uploadDate : new Date().toISOString()
      }

      let updatedItems
      if (editingItem) {
        updatedItems = musicItems.map(item => 
          item.id === editingItem.id ? musicItem : item
        )
      } else {
        updatedItems = [...musicItems, musicItem]
      }

      saveMusicItems(updatedItems)

      // Reset form
      setNewItem({
        title: '',
        composer: '',
        category: 'Drumline',
        subcategory: '',
        duration: '',
        difficulty: 'Intermediate',
        description: '',
        instrumentation: '',
        tempo: '',
        keySignature: '',
        yearComposed: new Date().getFullYear(),
        tags: '',
        priceStandard: '',
        priceExclusive: '',
        audioFile: null,
        sheetMusicFile: null,
        imageFile: null
      })

      setEditingItem(null)
      setActiveTab('manage')
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading files. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setNewItem({
      title: item.title,
      composer: item.composer,
      category: item.category,
      subcategory: item.subcategory,
      duration: item.duration,
      difficulty: item.difficulty,
      description: item.description,
      instrumentation: Array.isArray(item.instrumentation) ? item.instrumentation.join(', ') : item.instrumentation,
      tempo: item.tempo,
      keySignature: item.keySignature,
      yearComposed: item.yearComposed,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
      priceStandard: item.price?.standard || '',
      priceExclusive: item.price?.exclusive || '',
      audioFile: null,
      sheetMusicFile: null,
      imageFile: null
    })
    setActiveTab('upload')
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = musicItems.filter(item => item.id !== id)
      saveMusicItems(updatedItems)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accAdminAuth')
    onLogout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Music className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Alliance Collective Admin</h1>
                <p className="text-sm text-gray-500">Content Management System</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upload'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Upload className="h-4 w-4 inline mr-2" />
              {editingItem ? 'Edit Music' : 'Upload Music'}
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manage'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Manage Catalog ({musicItems.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit Music Item' : 'Upload New Music'}
              </h2>
              {editingItem && (
                <button
                  onClick={() => {
                    setEditingItem(null)
                    setNewItem({
                      title: '',
                      composer: '',
                      category: 'Drumline',
                      subcategory: '',
                      duration: '',
                      difficulty: 'Intermediate',
                      description: '',
                      instrumentation: '',
                      tempo: '',
                      keySignature: '',
                      yearComposed: new Date().getFullYear(),
                      tags: '',
                      priceStandard: '',
                      priceExclusive: '',
                      audioFile: null,
                      sheetMusicFile: null,
                      imageFile: null
                    })
                  }}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Composer *
                  </label>
                  <input
                    type="text"
                    value={newItem.composer}
                    onChange={(e) => setNewItem({...newItem, composer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={newItem.subcategory}
                    onChange={(e) => setNewItem({...newItem, subcategory: e.target.value})}
                    placeholder="e.g., Competition Cadence, Concert Piece"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty *
                  </label>
                  <select
                    value={newItem.difficulty}
                    onChange={(e) => setNewItem({...newItem, difficulty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instrumentation
                  </label>
                  <input
                    type="text"
                    value={newItem.instrumentation}
                    onChange={(e) => setNewItem({...newItem, instrumentation: e.target.value})}
                    placeholder="Snare Drums, Tenor Drums, Bass Drums (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                    placeholder="competition, high-energy, showcase (comma separated)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newItem.duration}
                    onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                    placeholder="3:45"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo
                  </label>
                  <input
                    type="text"
                    value={newItem.tempo}
                    onChange={(e) => setNewItem({...newItem, tempo: e.target.value})}
                    placeholder="120 BPM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Signature
                  </label>
                  <input
                    type="text"
                    value={newItem.keySignature}
                    onChange={(e) => setNewItem({...newItem, keySignature: e.target.value})}
                    placeholder="Bb Major"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year Composed
                  </label>
                  <input
                    type="number"
                    value={newItem.yearComposed}
                    onChange={(e) => setNewItem({...newItem, yearComposed: e.target.value})}
                    min="1900"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard License Price ($)
                  </label>
                  <input
                    type="number"
                    value={newItem.priceStandard}
                    onChange={(e) => setNewItem({...newItem, priceStandard: e.target.value})}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclusive License Price ($)
                  </label>
                  <input
                    type="number"
                    value={newItem.priceExclusive}
                    onChange={(e) => setNewItem({...newItem, priceExclusive: e.target.value})}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">File Uploads</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audio File (MP3, WAV)
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setNewItem({...newItem, audioFile: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {newItem.audioFile && (
                      <p className="text-xs text-gray-500 mt-1">{newItem.audioFile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sheet Music (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewItem({...newItem, sheetMusicFile: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {newItem.sheetMusicFile && (
                      <p className="text-xs text-gray-500 mt-1">{newItem.sheetMusicFile.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Image (JPG, PNG)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewItem({...newItem, imageFile: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {newItem.imageFile && (
                      <p className="text-xs text-gray-500 mt-1">{newItem.imageFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null)
                    setActiveTab('manage')
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isUploading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {editingItem ? 'Updating...' : 'Uploading...'}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      {editingItem ? 'Update Music' : 'Upload Music'}
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Music Catalog</h2>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Music
                </button>
              </div>
            </div>

            {musicItems.length === 0 ? (
              <div className="p-12 text-center">
                <Music className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No music uploaded yet</h3>
                <p className="text-gray-500 mb-6">Start building your catalog by uploading your first music arrangement.</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="flex items-center mx-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Upload First Music
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Music
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Files
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {musicItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">by {item.composer}</div>
                            <div className="text-xs text-gray-400">{item.duration}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{item.category}</div>
                          {item.subcategory && (
                            <div className="text-xs text-gray-500">{item.subcategory}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>Standard: ${item.price?.standard || 0}</div>
                          <div>Exclusive: ${item.price?.exclusive || 0}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            {item.files?.audio && (
                              <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                Audio
                              </span>
                            )}
                            {item.files?.sheetMusic && (
                              <span className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                PDF
                              </span>
                            )}
                            {item.files?.image && (
                              <span className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                Image
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard

