<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                // Move the file to public/images directory
                $file->move(public_path('images'), $filename);
                
                $product = Product::create([
                    'name' => $request->name,
                    'description' => $request->description,
                    'price' => $request->price,
                    'stock' => $request->stock,
                    'image' => '/images/' . $filename // Store the path in database
                ]);

                // Add the full URL for the image
                $product->image_url = url($product->image);

                return response()->json([
                    'status' => 'success',
                    'message' => 'Product created successfully',
                    'data' => $product
                ], 201);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'No image file uploaded'
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->image_url = url($product->image);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($request->hasFile('image')) {
                // Delete old image if it exists
                $oldImagePath = public_path(ltrim($product->image, '/'));
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }

                // Store new image
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images'), $filename);
                $product->image = '/images/' . $filename;
            }

            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock
            ]);

            // Add the full URL for the image
            $product->image_url = url($product->image);

            return response()->json([
                'status' => 'success',
                'message' => 'Product updated successfully',
                'data' => $product
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            
            // Delete image file if it exists
            $imagePath = public_path(ltrim($product->image, '/'));
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            
            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
