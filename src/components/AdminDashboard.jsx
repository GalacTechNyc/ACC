import { useState, useEffect } from 'react'
import { Upload, Music, Image, FileText, Plus, Edit, Trash2, LogOut, Save, X } from 'lucide-react'
import AdminChatBot from './AdminChatBot.jsx'

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

  const handleAIFieldSuggestion = (suggestions) => {
    setNewItem(prev => ({
      ...prev,
      ...suggestions,
      tags: Array.isArray(suggestions.tags) ? suggestions.tags.join(', ') : (suggestions.tags || prev.tags)
    }))
  }

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
        files: {
          audio: audioData,
          sheetMusic: sheetMusicData,
          image: imageData
        },
        uploadDate: new Date().toISOString()
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
      alert(editingItem ? 'Music updated successfully!' : 'Music uploaded successfully!')
      
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (item) => {
    setNewItem({
      title: item.title,
      composer: item.composer,
      category: item.category,
      subcategory: item.subcategory || '',
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
    setEditingItem(item)
    setActiveTab('upload')
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = musicItems.filter(item => item.id !== id)
      saveMusicItems(updatedItems)
    }
  }

  const cancelEdit = () => {
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
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manage'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Music className="h-4 w-4 inline mr-2" />
              Manage Catalog ({musicItems.length})
            </button>
          </nav>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? 'Edit Music Arrangement' : 'Upload New Music Arrangement'}
              </h2>
              {editingItem && (
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter arrangement title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Composer *
                  </label>
                  <input
                    type="text"
                    required
                    value={newItem.composer}
                    onChange={(e) => setNewItem({...newItem, composer: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter composer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    required
                    value={newItem.difficulty}
                    onChange={(e) => setNewItem({...newItem, difficulty: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newItem.duration}
                    onChange={(e) => setNewItem({...newItem, duration: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 3:45"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo (BPM)
                  </label>
                  <input
                    type="number"
                    value={newItem.tempo}
                    onChange={(e) => setNewItem({...newItem, tempo: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 120"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., C Major"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 2024"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the arrangement, style, and performance notes..."
                />
              </div>

              {/* Instrumentation and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instrumentation
                  </label>
                  <input
                    type="text"
                    value={newItem.instrumentation}
                    onChange={(e) => setNewItem({...newItem, instrumentation: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Snare Drums, Bass Drums, Cymbals"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., marching, competition, energetic"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Standard License Price ($)
                  </label>
                  <input
                    type="number"
                    value={newItem.priceStandard}
                    onChange={(e) => setNewItem({...newItem, priceStandard: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 50"
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
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 200"
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">File Uploads</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Audio File (MP3, WAV)
                    </label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setNewItem({...newItem, audioFile: e.target.files[0]})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {newItem.audioFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {newItem.audioFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="h-4 w-4 inline mr-1" />
                      Sheet Music (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewItem({...newItem, sheetMusicFile: e.target.files[0]})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {newItem.sheetMusicFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {newItem.sheetMusicFile.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Image className="h-4 w-4 inline mr-1" />
                      Cover Image (JPG, PNG)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewItem({...newItem, imageFile: e.target.files[0]})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {newItem.imageFile && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {newItem.imageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {editingItem ? 'Updating...' : 'Uploading...'}
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {editingItem ? 'Update Music' : 'Upload Music'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Music Catalog</h2>
              <p className="text-gray-600 mt-1">Manage your uploaded music arrangements</p>
            </div>

            {musicItems.length === 0 ? (
              <div className="p-12 text-center">
                <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No music uploaded yet</h3>
                <p className="text-gray-600 mb-4">Start by uploading your first music arrangement</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Upload Music
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Composer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difficulty
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.duration}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.composer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.difficulty}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap">
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
      
      {/* AI Assistant Chatbot */}
      <AdminChatBot onFieldSuggestion={handleAIFieldSuggestion} />
    </div>
  )
}

export default AdminDashboard

