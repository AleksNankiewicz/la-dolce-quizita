import EditableCategoryModal from '@/components/editables/EditableCategory'
import EditablePermissions from '@/components/editables/EditablePermissions'
import SearchBar from '@/components/layouts/SearchBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteCategory, getSubCategories } from '@/lib/actions'
import { formatDate } from '@/lib/utils'
import { Pen, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { unstable_noStore as noStore } from 'next/cache'
import AdminCategories from '@/components/pages/AdminCategories'

const AdminCategoryPage = async () => {
  const categories = await getSubCategories()

  return <AdminCategories categoriesData={categories} />
}

export default AdminCategoryPage
