import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FundRasingPage = () => {
    const navigate = useNavigate()

    const initialCampaigns = [
        {
            id: 1,
            title: 'Library Expansion Fund',
            tag: 'Education',
            description: 'Help us add 500+ new books and create a reading lounge for students.',
            upiId: 'library@upi',
            raised: 45000,
            goal: 100000,
            link: '/campaign/1',
            emoji: '📚'
        },
        {
            id: 2,
            title: 'Campus Health Drive',
            tag: 'Health',
            description: 'Support free medical checkups and wellness workshops on campus.',
            upiId: 'healthcampus@upi',
            raised: 30000,
            goal: 50000,
            link: '/campaign/2',
            emoji: '🏥'
        },
        {
            id: 3,
            title: 'Sports Equipment Upgrade',
            tag: 'Sports',
            description: 'Fund new cricket bats, basketballs, and gym mats for all students.',
            upiId: 'sportsgear@upi',
            raised: 20000,
            goal: 40000,
            link: '/campaign/3',
            emoji: '⚽'
        },
    ]

    const [campaigns, setCampaigns] = useState(initialCampaigns)
    const [donations, setDonations] = useState({})
    const [copiedId, setCopiedId] = useState(null)

    const handleAmountChange = (id, value) => {
        setDonations(prev => ({ ...prev, [id]: value }))
    }

    const handleDonate = (id, upiId) => {
        const amount = parseInt(donations[id]) || 0
        if (amount <= 0) return alert('Please enter a valid amount')

        alert(`Thank you for pledging ₹${amount}! Please send to UPI ID: ${upiId}`)

        setCampaigns(prev => prev.map(c =>
            c.id === id ? { ...c, raised: c.raised + amount } : c
        ))

        setDonations(prev => ({ ...prev, [id]: '' }))
    }

    const copyToClipboard = (upiId, id) => {
        navigator.clipboard.writeText(upiId)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const getTagColor = (tag) => {
        switch (tag) {
            case 'Education': return 'bg-purple-100 text-purple-800'
            case 'Health': return 'bg-pink-100 text-pink-800'
            case 'Sports': return 'bg-cyan-100 text-cyan-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex bg-white w-fit py-1 px-3 rounded-full border-2 border-amber-300 mb-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="ml-2">Back</span>
            </button>

            <div className="text-center mb-6 bg-white rounded-t-2xl border border-b-0">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Empower Our Community
                </h1>
                <p className="text-gray-600 text-lg">Your support makes dreams reality. Choose a cause to back.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg mb-12 shadow-sm">
                <p className="text-sm">
                    ⚠️ <strong>Important:</strong> We currently do not use a payment gateway.
                    Please send your donation manually via the provided UPI ID. After completing the transfer, enter the amount here and click "Donate Now" to update the fundraiser status.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {campaigns.map(c => {
                    const percent = Math.min(100, Math.round((c.raised / c.goal) * 100))
                    return (
                        <div key={c.id} className="group relative border border-gray-100 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                            <div className="absolute top-4 right-4 text-3xl">{c.emoji}</div>

                            <div className="mb-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`${getTagColor(c.tag)} px-3 py-1 rounded-full text-sm font-medium`}>
                                        {c.tag}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 pr-8">{c.title}</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">{c.description}</p>
                            </div>

                            <div className="mb-5">
                                <div className="flex justify-between text-sm font-medium mb-2">
                                    <span className="text-gray-600">Raised</span>
                                    <span className="text-gray-900">₹{c.raised.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>{percent}% funded</span>
                                    <span>Goal: ₹{c.goal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                    <input
                                        id={`amt-${c.id}`}
                                        type="number"
                                        min="1"
                                        value={donations[c.id] || ''}
                                        onChange={e => handleAmountChange(c.id, e.target.value)}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-600">UPI ID</p>
                                        <p className="font-mono text-sm">{c.upiId}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(c.upiId, c.id)}
                                        className="ml-2 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                    >
                                        {copiedId === c.id ? (
                                            <span className="text-green-600">✓ Copied!</span>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDonate(c.id, c.upiId)}
                                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                            >
                                Donate Now
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FundRasingPage