import { useState } from 'react'
import { Card } from '../ui/Card'
import { FormActions } from '../ui/FormActions'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'

const defaultValues = {
  title: 'Р СѓСЃСЃРєРёР№ СЏР·С‹Рє',
  price: '24165',
  shortDescription:
    'РћСЃРЅРѕРІРЅРѕР№ РєСѓСЂСЃ 3.0 вЂ” СЌС‚Рѕ РєРѕРјРїР»РµРєСЃРЅР°СЏ СЃРёСЃС‚РµРјР° РїРѕРґРіРѕС‚РѕРІРєРё Рє Р•Р“Р­ РїРѕ СЂСѓСЃСЃРєРѕРјСѓ СЏР·С‹РєСѓ РЅР° РјР°РєСЃРёРјСѓРј!',
  fullDescription:
    'РџРѕРґСЂРѕР±РЅР°СЏ РїСЂРѕРіСЂР°РјРјР° РєСѓСЂСЃР° РІРєР»СЋС‡Р°РµС‚ РІ СЃРµР±СЏ РІСЃРµ СЂР°Р·РґРµР»С‹ СЏР·С‹РєРѕР·РЅР°РЅРёСЏ: РѕСЂС„РѕРіСЂР°С„РёСЋ, РїСѓРЅРєС‚СѓР°С†РёСЋ, Р»РµРєСЃРёРєСѓ, РіСЂР°РјРјР°С‚РёРєСѓ. РљР°Р¶РґС‹Р№ РјРѕРґСѓР»СЊ СЃРѕРґРµСЂР¶РёС‚ С‚РµРѕСЂРµС‚РёС‡РµСЃРєРёРµ РјР°С‚РµСЂРёР°Р»С‹ Рё РїСЂР°РєС‚РёС‡РµСЃРєРёРµ Р·Р°РґР°РЅРёСЏ.',
  status: 'РћРїСѓР±Р»РёРєРѕРІР°РЅ',
}

export function CourseInfoForm() {
  const [form, setForm] = useState(defaultValues)

  const update = (field: keyof typeof defaultValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="РќР°Р·РІР°РЅРёРµ РєСѓСЂСЃР°"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
        />
        <Input
          label="РЎС‚РѕРёРјРѕСЃС‚СЊ"
          value={form.price}
          onChange={(e) => update('price', e.target.value)}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ"
          rows={3}
          value={form.shortDescription}
          onChange={(e) => update('shortDescription', e.target.value)}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="РџРѕР»РЅРѕРµ РѕРїРёСЃР°РЅРёРµ"
          rows={8}
          value={form.fullDescription}
          onChange={(e) => update('fullDescription', e.target.value)}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Input
          label="РЎС‚Р°С‚СѓСЃ"
          value={form.status}
          onChange={(e) => update('status', e.target.value)}
        />
      </div>

      <FormActions
        onCancel={() => setForm(defaultValues)}
        onSave={() => {}}
      />
    </Card>
  )
}
